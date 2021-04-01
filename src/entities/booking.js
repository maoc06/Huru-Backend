export default function buildMakeBooking() {
  return function makeBooking({ ...entity }) {
    const {
      paymentId,
      bookingCar,
      bookingBy,
      checkin,
      checkout,
      pricePerDay,
      priceForStay,
      taxPaid,
      siteFees,
      amountPaid,
      bookingAddress,
      bookingLongitude,
      bookingLatitude,
      bookingStatus,
    } = { ...entity };

    if (!paymentId) throw new Error('Booking must have a payment assigned');
    if (!bookingCar) throw new Error('Booking must have a car assigned');
    if (!bookingBy) throw new Error('Booking must be assigned to a user');
    if (!checkin) throw new Error('Booking must have a start date assigned');
    if (!checkout) throw new Error('Booking must have a end date assigned');
    if (!pricePerDay)
      throw new Error('Booking must be assigned a price per day');
    if (!priceForStay)
      throw new Error('Booking must be assigned a price for stay');
    if (!taxPaid) throw new Error('Booking must be assigned a tax paid');
    if (!siteFees) throw new Error('Booking must be assigned a site fees');
    if (!amountPaid) throw new Error('Booking must be assigned a amount paid');
    if (!bookingAddress)
      throw new Error('Booking must be assigned to an address');
    if (!bookingLongitude)
      throw new Error('Booking must be assigned to a longitude (coordinate)');
    if (!bookingLatitude)
      throw new Error('Booking must be assigned to a latitude (coordinate)');
    if (!bookingStatus) throw new Error('Booking must have a status');

    const booking = Object.freeze({ ...entity });

    return booking;
  };
}
