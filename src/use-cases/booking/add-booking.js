import { config } from '../../../config';
import { makeBooking } from '../../entities';
import { formatFullDate } from '../../utils/dates';

export default function makeAddBooking({
  bookingDb,
  userDb,
  carDb,
  sendBookingRequestMail,
}) {
  return async function addBooking(bookingInfo) {
    const booking = makeBooking(bookingInfo);

    const { dataValues: applicantUser } = await userDb.findByUUID(
      booking.bookingBy
    );
    if (!applicantUser) {
      throw new Error(
        'The user trying to assign to the reservation does not exist'
      );
    }

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
      carImage: `${car.images[0].imagePath}`,
      startDate: formatFullDate({ date: booking.checkin, type: 'SQL' }),
      endDate: formatFullDate({ date: booking.checkout, type: 'SQL' }),
      applicant: `${applicantUser.firstName} ${applicantUser.lastName}`,
      url: `http://${config.webAppServerBaseUrl}/host/request-details/${response.dataValues.id}`,
    });

    return response;
  };
}
