export default function makeListIfAlreadyReviewed({ userDb, bookingDb }) {
  return async function listIfAlreadyReviewed({ bookingId } = {}) {
    let reviewed = { alreadyReviewed: false };

    if (!bookingId) throw new Error('Booking id null');

    const existing = await bookingDb.findById(bookingId);
    if (!existing) {
      throw new Error(`The booking with id ${bookingId} does not exist`);
    }

    const alreadyReviewed = await userDb.findUserReviewsByBooking(bookingId);

    if (alreadyReviewed) {
      const {
        dataValues: { comment, rating },
      } = alreadyReviewed;

      reviewed = { alreadyReviewed: true, comment, rating };
    }
    return reviewed;
  };
}
