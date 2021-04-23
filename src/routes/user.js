import express from 'express';
import makeCallback from '../express-callback';
import authorize from '../utils/middlewares/authorization';
import { Normal } from '../utils/role';
import verifyToken from '../utils/middlewares/verify-token';

import { userControllers } from '../controllers';

function getUserRoutes() {
  const router = express.Router();

  router.get('/:uuid', makeCallback(userControllers.getUser));

  router.get(
    '/reviews/:userId',
    verifyToken,
    authorize([Normal]),
    makeCallback(userControllers.getUserReviews)
  );

  router.get(
    '/already-reviewed/:bookingId',
    verifyToken,
    authorize([Normal]),
    makeCallback(userControllers.getIfAlreadyReviewed)
  );

  router.post(
    '/review',
    verifyToken,
    authorize([Normal]),
    makeCallback(userControllers.postUserReview)
  );

  router.patch(
    '/password',
    verifyToken,
    authorize([Normal]),
    makeCallback(userControllers.patchPassword)
  );

  router.patch(
    '/phone',
    verifyToken,
    authorize([Normal]),
    makeCallback(userControllers.patchPhone)
  );

  router.patch(
    '/pic',
    verifyToken,
    authorize([Normal]),
    makeCallback(userControllers.patchProfilePic)
  );

  return router;
}

export default getUserRoutes;
