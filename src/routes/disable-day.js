import express from 'express';
import makeCallback from '../express-callback';
import authorize from '../utils/middlewares/authorization';
import { Normal, Admin } from '../utils/role';

import { disableDayControllers } from '../controllers';

function getDisableDayRoutes() {
  const router = express.Router();

  router.get(
    '/by-car/:carId',
    authorize([Normal, Admin]),
    makeCallback(disableDayControllers.getByCar)
  );

  router.post(
    '/',
    authorize([Normal, Admin]),
    makeCallback(disableDayControllers.postDisableDay)
  );

  router.delete(
    '/:carId/:disableDay',
    authorize([Normal, Admin]),
    makeCallback(disableDayControllers.deleteDisableDay)
  );

  return router;
}

export default getDisableDayRoutes;
