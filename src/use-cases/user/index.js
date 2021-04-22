import makeListUser from './list-user';
import makeListReviews from './list-reviews';
import makeListIfAlreadyReviewed from './list-if-already-reviewed';
import makeAddUserReview from './add-review';

import { userDb, bookingDb } from '../../data-access';

const listUser = makeListUser({ userDb });
const listReviews = makeListReviews({ userDb });
const listIfAlreadyReviewed = makeListIfAlreadyReviewed({ userDb, bookingDb });
const addUserReview = makeAddUserReview({ userDb });

export default {
  listUser,
  listReviews,
  listIfAlreadyReviewed,
  addUserReview,
};
