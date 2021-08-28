export default function makeCancelBooking({ bookingDb }) {
  return async function cancelBooking(bookingInfo) {
    const response = await bookingDb.update(bookingInfo);
    return response;
  };
}
