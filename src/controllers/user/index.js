import { userUseCases } from '../../use-cases';

import makeGetUser from './get-user';
import makeGetUserReviews from './get-user-reviews';
import makeGetIfAlreadyReviewed from './get-if-already-reviewed';
import makePostUserReview from './post-user-review';

const {
  listUser,
  listReviews,
  listIfAlreadyReviewed,
  addUserReview,
} = userUseCases;

const getUser = makeGetUser({ listUser });
const getUserReviews = makeGetUserReviews({ listReviews });
const getIfAlreadyReviewed = makeGetIfAlreadyReviewed({
  listIfAlreadyReviewed,
});
const postUserReview = makePostUserReview({ addUserReview });

export default {
  getUser,
  getUserReviews,
  getIfAlreadyReviewed,
  postUserReview,
};
