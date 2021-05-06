import express from 'express';
import makeCallback from '../express-callback';
import authorize from '../utils/middlewares/authorization';
import { Normal, Admin } from '../utils/role';

import verifyToken from '../utils/middlewares/verify-token';

import { carControllers } from '../controllers';

function getCarRoutes() {
  const router = express.Router();

  router.get('/:carId', makeCallback(carControllers.getCar));

  router.get('/by-user/:id', makeCallback(carControllers.getCarByUserOwner));

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

  router.get('/features/:carId', makeCallback(carControllers.getFeaturesByCar));

  router.post(
    '/',
    verifyToken,
    authorize([Normal, Admin]),
    makeCallback(carControllers.postCar)
  );

  router.patch(
    '/visibility',
    verifyToken,
    authorize([Normal, Admin]),
    makeCallback(carControllers.patchVisibility)
  );

  router.patch(
    '/disable',
    verifyToken,
    authorize([Normal, Admin]),
    makeCallback(carControllers.patchDisable)
  );

  router.patch(
    '/booking-terms',
    verifyToken,
    authorize([Normal, Admin]),
    makeCallback(carControllers.patchBookingTerms)
  );

  router.put(
    '/features',
    verifyToken,
    authorize([Normal, Admin]),
    makeCallback(carControllers.putFeatures)
  );

  return router;
}

export default getCarRoutes;
