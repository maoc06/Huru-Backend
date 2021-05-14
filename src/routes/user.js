import express from 'express';
import multer from 'multer';
import makeCallback from '../express-callback';
import authorize from '../utils/middlewares/authorization';
import { Normal } from '../utils/role';
import verifyToken from '../utils/middlewares/verify-token';

import { userControllers } from '../controllers';

const storage = multer.memoryStorage();
const upload = multer({ storage });

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

  router.post(
    '/profile-pic',
    upload.single('file'),
    makeCallback(userControllers.postProfilePic)
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
    upload.single('file'),
    makeCallback(userControllers.patchProfilePic)
  );

  router.put(
    '/',
    verifyToken,
    authorize([Normal]),
    makeCallback(userControllers.putUserData)
  );

  return router;
}

export default getUserRoutes;
