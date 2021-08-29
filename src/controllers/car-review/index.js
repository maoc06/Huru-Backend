import { carReviewUseCases } from '../../use-cases';

import makeGetByCar from './get-by-car';
import makeGetIfAlreadyReviewed from './get-if-already-reviewed';
import makeGetAllReviewsByCar from './get-all-reviews-by-user';
import makePostReview from './post-review';
import makeDeleteCarReviews from './delete-review';

const {
  listByCar,
  listIfAlreadyReviewed,
  addCarReview,
  allReviewsByUser,
  destroyCarReview,
} = carReviewUseCases;

const getByCar = makeGetByCar({ listByCar });
const getIfAlreadyReviewed = makeGetIfAlreadyReviewed({
  listIfAlreadyReviewed,
});
const getAllReviewsByCar = makeGetAllReviewsByCar({
  allReviewsByUser,
});
const postReview = makePostReview({ addCarReview });
const deleteCarReview = makeDeleteCarReviews({ destroyCarReview });

export default {
  getByCar,
  getIfAlreadyReviewed,
  getAllReviewsByCar,
  postReview,
  deleteCarReview,
};
