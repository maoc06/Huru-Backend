import { diffNowDefault, isLowDate } from '../utils/dates';

export default function buildMakeBooking() {
  return function makeBooking({ ...entity }) {
    const {
      paymentId,
      bookingCar,
      bookingBy,
      checkin,
      checkout,
      pricePerDay,
      siteFees,
    } = { ...entity };
    if (!paymentId) throw new Error('Booking must have a payment assigned');
    if (!bookingCar) throw new Error('Booking must have a car assigned');
    if (!bookingBy) throw new Error('Booking must be assigned to a user');

    if (!checkin) throw new Error('Booking must have a start date assigned');
    if (diffNowDefault(checkin) < 0)
      throw new Error(
        'Check in date for booking must be made on a future date'
      );

    if (!checkout) throw new Error('Booking must have a end date assigned');
    if (diffNowDefault(checkout) < 0)
      throw new Error(
        'Check out date for booking must be made on a future date'
      );
    if (isLowDate(checkin, checkout))
      throw new Error(
        'Check out date for booking must be greater than check in date'
      );

    if (!pricePerDay)
      throw new Error('Booking must be assigned a price per day');
    // The price per day of the minimum reservation is the minimum
    // price allowed for a car ($ 50,000), less the possible maximum
    // discount of 15%. Therefore the minimum price per reservation
    // day is 42500
    if (pricePerDay < 42500 || pricePerDay > 1000000)
      throw new Error(
        'Booking must have a price per day between $42,500 - $1,000,000 COP'
      );
    if (!siteFees) throw new Error('Booking must be assigned a site fees');

    const booking = Object.freeze({ ...entity });

    return booking;
  };
}
