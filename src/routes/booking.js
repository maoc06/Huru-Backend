import express from 'express';
import makeCallback from '../express-callback';
import authorize from '../utils/middlewares/authorization';
import { Normal, Admin } from '../utils/role';

import { bookingControllers } from '../controllers';

function getBookingRoutes() {
  const router = express.Router();

  router.get(
    '/:id',
    authorize([Normal, Admin]),
    makeCallback(bookingControllers.getBooking)
  );

  router.get(
    '/upcoming/:uuid',
    authorize([Normal, Admin]),
    makeCallback(bookingControllers.getUpcomingBookings)
  );

  router.get(
    '/history/:uuid',
    authorize([Normal, Admin]),
    makeCallback(bookingControllers.getBookingsHistory)
  );

  router.get(
    '/by-owner/:uuid',
    authorize([Normal, Admin]),
    makeCallback(bookingControllers.getByUserOwner)
  );

  router.post(
    '/',
    authorize([Normal, Admin]),
    makeCallback(bookingControllers.postBooking)
  );

  router.put(
    '/confirm',
    authorize([Normal, Admin]),
    makeCallback(bookingControllers.putConfirmBooking)
  );

  router.put(
    '/cancel',
    authorize([Normal, Admin]),
    makeCallback(bookingControllers.putCancelBooking)
  );

  return router;
}

export default getBookingRoutes;
