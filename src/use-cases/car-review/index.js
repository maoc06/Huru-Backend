import makeListByCar from './list-by-car';
import makeListIfAlreadyReviewed from './list-if-already-reviewed';
import makeAddCarReview from './add-review';

import { carReviewDb, carDb, userDb, bookingDb } from '../../data-access';

const listByCar = makeListByCar({ carReviewDb, carDb, userDb });
const listIfAlreadyReviewed = makeListIfAlreadyReviewed({
  carReviewDb,
  bookingDb,
});
const addCarReview = makeAddCarReview({ carReviewDb });

export default {
  listByCar,
  listIfAlreadyReviewed,
  addCarReview,
};
