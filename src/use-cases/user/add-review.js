import { makeUserReview } from '../../entities';

export default function makeAddUserReview({ userDb }) {
  return async function addUserReview(reviewInfo) {
    const review = makeUserReview(reviewInfo);

    return userDb.insertReview(review);
  };
}
