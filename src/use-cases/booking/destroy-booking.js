export default function makeDestroyBooking({ bookingDb }) {
  return async function destroyBooking({ id }) {
    const existing = await bookingDb.findByIdSimple(id);
    if (!existing) throw new Error('Booking not found');

    const response = await bookingDb.deleteBooking(id);
    return response;
  };
}
