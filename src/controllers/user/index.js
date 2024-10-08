import { userUseCases } from '../../use-cases';

import makeGetUser from './get-user';
import makeGetUserReviews from './get-user-reviews';
import makeGetIfAlreadyReviewed from './get-if-already-reviewed';
import makePostUserReview from './post-user-review';
import makePostProfilePic from './post-profile-pic';
import makePatchPassword from './patch-password';
import makePatchPhone from './patch-phone';
import makePatchProfilePic from './patch-profile-pic';
import makePutUserData from './put-user-data';

const {
  addUserReview,
  listUser,
  listReviews,
  listIfAlreadyReviewed,
  updateData,
  updatePassword,
  updatePhone,
  updateProfilePic,
  uploadProfilePic,
} = userUseCases;

const getUser = makeGetUser({ listUser });
const getUserReviews = makeGetUserReviews({ listReviews });
const getIfAlreadyReviewed = makeGetIfAlreadyReviewed({
  listIfAlreadyReviewed,
});
const postUserReview = makePostUserReview({ addUserReview });
const postProfilePic = makePostProfilePic({ uploadProfilePic });
const patchPassword = makePatchPassword({ updatePassword });
const patchPhone = makePatchPhone({ updatePhone });
const patchProfilePic = makePatchProfilePic({ updateProfilePic });
const putUserData = makePutUserData({ updateData });

export default {
  getUser,
  getUserReviews,
  getIfAlreadyReviewed,
  postUserReview,
  postProfilePic,
  patchPassword,
  patchPhone,
  patchProfilePic,
  putUserData,
};
