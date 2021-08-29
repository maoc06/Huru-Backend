import express from 'express';
import makeCallback from '../express-callback';
import authorize from '../utils/middlewares/authorization';
import { Normal } from '../utils/role';
import verifyToken from '../utils/middlewares/verify-token';

import { carReviewControllers } from '../controllers';

function getCarReviewRoutes() {
  const router = express.Router();

  router.get('/:carId', makeCallback(carReviewControllers.getByCar));

  router.get(
    '/already-reviewed/:bookingId',
    makeCallback(carReviewControllers.getIfAlreadyReviewed)
  );

  router.get(
    '/all-by-user/:userId',
    makeCallback(carReviewControllers.getAllReviewsByCar)
  );

  router.post(
    '/',
    verifyToken,
    authorize([Normal]),
    makeCallback(carReviewControllers.postReview)
  );

  router.delete(
    '/:id',
    verifyToken,
    authorize([Normal]),
    makeCallback(carReviewControllers.deleteCarReview)
  );

  return router;
}

export default getCarReviewRoutes;
