export default function makeListByUserOwner({ bookingDb, userDb }) {
  return async function listByUserOwner({ uuid } = {}) {
    if (!uuid) throw new Error(`User with id ${uuid} does not exists`);

    const bookingRequests = await bookingDb.findByUser(uuid);

    await Promise.all(
      bookingRequests.map(async ({ dataValues }) => {
        const booking = dataValues;
        const { id: bookingId } = booking;

        const already = await userDb.findUserReviewsByBooking(bookingId);
        if (!already) {
          booking.alreadyReviewed = false;
        } else {
          booking.alreadyReviewed = true;
        }
      })
    );

    return bookingRequests;
  };
}
