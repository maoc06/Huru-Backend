import { makeCarReview } from '../../entities';

export default function makeAddCarReview({ carReviewDb }) {
  return async function addCarReview(reviewInfo) {
    const review = makeCarReview(reviewInfo);
    return carReviewDb.insert(review);
  };
}
