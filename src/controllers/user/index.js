import { userUseCases } from '../../use-cases';

import makeGetUser from './get-user';
import makeGetUserReviews from './get-user-reviews';
import makeGetIfAlreadyReviewed from './get-if-already-reviewed';
import makePostUserReview from './post-user-review';
import makePatchPassword from './patch-password';
import makePatchPhone from './patch-phone';
import makePatchProfilePic from './patch-profile-pic';

const {
  addUserReview,
  listUser,
  listReviews,
  listIfAlreadyReviewed,
  updatePassword,
  updatePhone,
  updateProfilePic,
} = userUseCases;

const getUser = makeGetUser({ listUser });
const getUserReviews = makeGetUserReviews({ listReviews });
const getIfAlreadyReviewed = makeGetIfAlreadyReviewed({
  listIfAlreadyReviewed,
});
const postUserReview = makePostUserReview({ addUserReview });
const patchPassword = makePatchPassword({ updatePassword });
const patchPhone = makePatchPhone({ updatePhone });
const patchProfilePic = makePatchProfilePic({ updateProfilePic });

export default {
  getUser,
  getUserReviews,
  getIfAlreadyReviewed,
  postUserReview,
  patchPassword,
  patchPhone,
  patchProfilePic,
};
