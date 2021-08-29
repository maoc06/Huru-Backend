import { makeCarReview } from '../../entities';

export default function makeAddCarReview({
  carReviewDb,
  carDb,
  userDb,
  bookingDb,
}) {
  return async function addCarReview(reviewInfo) {
    const review = makeCarReview(reviewInfo);

    const carExisting = await carDb.findByIdSimple(review.carId);
    if (!carExisting)
      throw new RangeError('car trying to add a review not found');

    const userExisting = await userDb.findByUUID(review.addedBy);
    if (!userExisting)
      throw new RangeError('user trying to add the review does not exist');

    const bookingExisting = await bookingDb.findByIdSimple(review.bookingId);
    if (!bookingExisting)
      throw new RangeError('booking trying to add a review does not exist');

    return carReviewDb.insert(review);
  };
}
