import { config } from '../../../config';
import { makeBooking } from '../../entities';
import { formatFullDate } from '../../utils/dates';

export default function makeAddBooking({
  bookingDb,
  userDb,
  carDb,
  paymentUserDb,
  sendBookingRequestMail,
}) {
  return async function addBooking(bookingInfo) {
    const booking = makeBooking(bookingInfo);

    const payExisting = await paymentUserDb.findById(booking.paymentId);
    if (!payExisting)
      throw new RangeError(
        'The payment method to be used for the transaction does not exist'
      );

    const userExisting = await userDb.findByUUID(booking.bookingBy);
    if (!userExisting) {
      throw new Error(
        'The user trying to assign to the reservation does not exist'
      );
    }

    const { dataValues: applicantUser } = userExisting;

    const car = await carDb.findById(booking.bookingCar);
    if (!car) {
      throw new Error(
        'The car trying to assign to the reservation does not exist'
      );
    }

    const { dataValues: carOwner } = await userDb.findByUUID(
      car.userOwner.uuid
    );
    if (!carOwner) {
      throw new Error('An unexpected error occurred: car owner does not exist');
    }

    const response = await bookingDb.insert(bookingInfo);

    sendBookingRequestMail({
      emailToSend: carOwner.email,
      carInfo: `${car.maker.name} ${car.model.name} ${car.year}`,
      carImage: `${
        car.images.length === 0
          ? 'https://huru-bucket-maja.s3.sa-east-1.amazonaws.com/assets/default-car.png'
          : car.images[0].imagePath
      }`,
      startDate: formatFullDate({ date: booking.checkin, type: 'SQL' }),
      endDate: formatFullDate({ date: booking.checkout, type: 'SQL' }),
      applicant: `${applicantUser.firstName} ${applicantUser.lastName}`,
      url: `https://${config.webAppServerBaseUrl}/host/request-details/${response.dataValues.id}`,
    });

    return response;
  };
}
