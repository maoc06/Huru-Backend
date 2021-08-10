import makeListUser from './list-user';
import makeListReviews from './list-reviews';
import makeListIfAlreadyReviewed from './list-if-already-reviewed';
import makeAddUserReview from './add-review';
import makeListQuery from './query';
import makeUpdateData from './update-data';
import makeUpdatePassword from './update-password';
import makeUpdatePhone from './update-phone';
import makeUploadProfilePic from './upload-profile-pic';
import makeUpdateProfilePic from './update-profile-pic';

import { userDb, bookingDb } from '../../data-access';

const addUserReview = makeAddUserReview({ userDb });
const listUser = makeListUser({ userDb });
const listIfAlreadyReviewed = makeListIfAlreadyReviewed({ userDb, bookingDb });
const listReviews = makeListReviews({ userDb });
const listQuery = makeListQuery({ userDb });
const updateData = makeUpdateData({ userDb });
const updatePassword = makeUpdatePassword({ userDb });
const updatePhone = makeUpdatePhone({ userDb });
const uploadProfilePic = makeUploadProfilePic({ userDb });
const updateProfilePic = makeUpdateProfilePic({ userDb });

export default {
  addUserReview,
  listUser,
  listIfAlreadyReviewed,
  listReviews,
  listQuery,
  updateData,
  updatePassword,
  updatePhone,
  uploadProfilePic,
  updateProfilePic,
};
