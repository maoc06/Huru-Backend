import express from 'express';
import makeCallback from '../express-callback';
import authorize from '../utils/middlewares/authorization';
import { Normal, Admin } from '../utils/role';

import { bookingControllers } from '../controllers';

function getBookingRoutes() {
  const router = express.Router();

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

  return router;
}

export default getBookingRoutes;
