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

    console.log('Booking', booking);

    sendBookingRequestMail({
      emailToSend: carOwner.email,
      carInfo: `${car.name} ${car.model} ${car.year}`,
      carImage: car.images[0].imagePath,
      startDate: booking.checkin,
      endDate: booking.checkout,
      // startDate: formatBookingDate(booking.checkin),
      // endDate: formatBookingDate(booking.checkout),
      applicant: `${applicantUser.firstName} ${applicantUser.lastName}`,
      url: `http://192.168.0.14:3000/host/request-details/${19}`,
    });

    return response;
  };
}
