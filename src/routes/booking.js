import express from 'express';
import makeCallback from '../express-callback';
import authorize from '../utils/middlewares/authorization';
import { Normal, Admin } from '../utils/role';
import verifyToken from '../utils/middlewares/verify-token';

import { bookingControllers } from '../controllers';

function getBookingRoutes() {
  const router = express.Router();

  router.get(
    '/:id',
    verifyToken,
    authorize([Normal, Admin]),
    makeCallback(bookingControllers.getBooking)
  );

  router.get(
    '/upcoming/:uuid',
    verifyToken,
    authorize([Normal, Admin]),
    makeCallback(bookingControllers.getUpcomingBookings)
  );

  router.get(
    '/history/:uuid',
    verifyToken,
    authorize([Normal, Admin]),
    makeCallback(bookingControllers.getBookingsHistory)
  );

  router.get(
    '/by-owner/:uuid',
    verifyToken,
    authorize([Normal, Admin]),
    makeCallback(bookingControllers.getByUserOwner)
  );

  router.get(
    '/count-completed-trips/:userId',
    makeCallback(bookingControllers.getCountCompletedTrips)
  );

  router.post(
    '/',
    verifyToken,
    authorize([Normal, Admin]),
    makeCallback(bookingControllers.postBooking)
  );

  router.put(
    '/confirm',
    verifyToken,
    authorize([Normal, Admin]),
    makeCallback(bookingControllers.putConfirmBooking)
  );

  router.put(
    '/cancel',
    verifyToken,
    authorize([Normal, Admin]),
    makeCallback(bookingControllers.putCancelBooking)
  );

  return router;
}

export default getBookingRoutes;
