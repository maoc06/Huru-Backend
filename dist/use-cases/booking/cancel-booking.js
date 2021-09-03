Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = makeCancelBooking;

function makeCancelBooking({ bookingDb }) {
  return async function cancelBooking(bookingInfo) {
    const response = await bookingDb.update(bookingInfo);
    return response;
  };
}
