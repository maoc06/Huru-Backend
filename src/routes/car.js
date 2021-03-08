import express from 'express';
import makeCallback from '../express-callback';
import authorize from '../utils/middlewares/authorization';
import { Normal, Admin } from '../utils/role';

import { carControllers } from '../controllers';

function getCarRoutes() {
  const router = express.Router();

  router.get(
    '/by-user/:id',
    authorize([Normal, Admin]),
    makeCallback(carControllers.getCarByUserOwner)
  );

  router.get(
    '/by-vin/:vin',
    authorize([Normal, Admin]),
    makeCallback(carControllers.getCarByVin)
  );

  router.get(
    '/by-license/:license',
    authorize([Normal, Admin]),
    makeCallback(carControllers.getCarByLicensePlate)
  );

  router.post(
    '/',
    authorize([Normal, Admin]),
    makeCallback(carControllers.postCar)
  );

  return router;
}

export default getCarRoutes;
