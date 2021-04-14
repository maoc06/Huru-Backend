import { carReviewUseCases } from '../../use-cases';

import makeGetByCar from './get-by-car';
import makeGetIfAlreadyReviewed from './get-if-already-reviewed';
import makePostReview from './post-review';

const { listByCar, listIfAlreadyReviewed, addCarReview } = carReviewUseCases;

const getByCar = makeGetByCar({ listByCar });
const getIfAlreadyReviewed = makeGetIfAlreadyReviewed({
  listIfAlreadyReviewed,
});
const postReview = makePostReview({ addCarReview });

export default {
  getByCar,
  getIfAlreadyReviewed,
  postReview,
};
