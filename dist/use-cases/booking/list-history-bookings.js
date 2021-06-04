"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeListBookingsHistory;

function makeListBookingsHistory({
  bookingDb,
  userDb,
  carReviewDb
}) {
  return async function listBookingsHistory({
    uuid
  } = {}) {
    if (!uuid) throw new Error(`User with id ${uuid} does not exists`);
    const existing = await userDb.findByUUID(uuid);
    if (!existing) throw new Error(`User not found`);
    const bookings = await bookingDb.findBookingsHistory(uuid);
    await Promise.all(bookings.map(async ({
      dataValues
    }) => {
      const booking = dataValues;
      const {
        id: bookingId
      } = booking;
      const alreadyReviewed = await carReviewDb.findByBooking(bookingId);

      if (!alreadyReviewed) {
        booking.alreadyReviewed = false;
      } else {
        booking.alreadyReviewed = true;
      }
    }));
    return bookings;
  };
}