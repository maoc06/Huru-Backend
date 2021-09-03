Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = makeListUpcomingBookings;

function makeListUpcomingBookings({ bookingDb, userDb }) {
  return async function listUpcomingBookings({ uuid } = {}) {
    if (!uuid) throw new Error(`User with id ${uuid} does not exists`);
    const existing = await userDb.findByUUID(uuid);
    if (!existing) throw new Error(`User not found`);
    const bookings = await bookingDb.findUpcomingBookings(uuid);
    return bookings;
  };
}
