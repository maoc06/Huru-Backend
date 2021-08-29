export default function makeDestroyCarReview({ carReviewDb }) {
  return async function destroyCarReview({ id }) {
    if (!id) throw new Error('car review id null');

    const existing = await carReviewDb.findById(id);
    if (!existing) throw new RangeError('Car review not found');

    return carReviewDb.deleteReview(id);
  };
}
