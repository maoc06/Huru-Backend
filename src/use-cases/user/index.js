import makeListUser from './list-user';
import makeListReviews from './list-reviews';
import makeListIfAlreadyReviewed from './list-if-already-reviewed';
import makeAddUserReview from './add-review';
import makeUpdateData from './update-data';
import makeUpdatePassword from './update-password';
import makeUpdatePhone from './update-phone';
import makeUpdateProfilePic from './update-profile-pic';

import { userDb, bookingDb } from '../../data-access';

const addUserReview = makeAddUserReview({ userDb });
const listUser = makeListUser({ userDb });
const listIfAlreadyReviewed = makeListIfAlreadyReviewed({ userDb, bookingDb });
const listReviews = makeListReviews({ userDb });
const updateData = makeUpdateData({ userDb });
const updatePassword = makeUpdatePassword({ userDb });
const updatePhone = makeUpdatePhone({ userDb });
const updateProfilePic = makeUpdateProfilePic({ userDb });

export default {
  addUserReview,
  listUser,
  listIfAlreadyReviewed,
  listReviews,
  updateData,
  updatePassword,
  updatePhone,
  updateProfilePic,
};
