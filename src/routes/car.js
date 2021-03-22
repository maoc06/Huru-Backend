import express from 'express';
import makeCallback from '../express-callback';
import authorize from '../utils/middlewares/authorization';
import { Normal, Admin } from '../utils/role';

import verifyToken from '../utils/middlewares/verify-token';

import { carControllers } from '../controllers';

function getCarRoutes() {
  const router = express.Router();

  router.get('/:carId', makeCallback(carControllers.getCar));

  router.get(
    '/by-user/:id',
    verifyToken,
    authorize([Normal, Admin]),
    makeCallback(carControllers.getCarByUserOwner)
  );

  router.get(
    '/by-vin/:vin',
    verifyToken,
    authorize([Normal, Admin]),
    makeCallback(carControllers.getCarByVin)
  );

  router.get(
    '/by-license/:license',
    verifyToken,
    authorize([Normal, Admin]),
    makeCallback(carControllers.getCarByLicensePlate)
  );

  // router.get(
  //   '/by-city/:city',
  //   verifyToken,
  //   authorize([Normal, Admin]),
  //   makeCallback(carControllers.getCarsByCity)
  // );

  router.post(
    '/',
    verifyToken,
    authorize([Normal, Admin]),
    makeCallback(carControllers.postCar)
  );

  return router;
}

export default getCarRoutes;
