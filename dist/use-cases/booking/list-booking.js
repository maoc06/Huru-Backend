"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeListBooking;

function makeListBooking({
  bookingDb
}) {
  return async function listBooking({
    id
  } = {}) {
    if (!id) throw new Error(`Booking id null`);
    const booking = await bookingDb.findById(id);
    return booking;
  };
}