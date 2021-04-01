import { makeBooking } from '../../entities';
import formatBookingDate from '../../utils/formatBookingDate';

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
    if (!applicantUser)
      throw new Error(
        'The user trying to assign to the reservation does not exist'
      );

    const car = await carDb.findCar(booking.bookingCar);
    if (!car)
      throw new Error(
        'The car trying to assign to the reservation does not exist'
      );

    const { dataValues: carOwner } = await userDb.findByUUID(car.user_id);
    if (!carOwner)
      throw new Error('An unexpected error occurred: car owner does not exist');

    const response = await bookingDb.insert(bookingInfo);

    sendBookingRequestMail({
      emailToSend: carOwner.email,
      carInfo: `${car.name} ${car.model} ${car.year}`,
      carImage: car.images[0].imagePath,
      startDate: formatBookingDate(booking.checkin),
      endDate: formatBookingDate(booking.checkout),
      applicant: `${applicantUser.firstName} ${applicantUser.lastName}`,
    });

    return response;
  };
}
