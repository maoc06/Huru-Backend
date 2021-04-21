import express from 'express';
import multer from 'multer';
import makeCallback from '../express-callback';
import authorize from '../utils/middlewares/authorization';
import verifyToken from '../utils/middlewares/verify-token';
import { Normal, Admin } from '../utils/role';

import { carBasicsSettingsControllers } from '../controllers';

const storage = multer.memoryStorage();
const upload = multer({ storage });

function getCarBasicsRoutes() {
  const router = express.Router();

  router.get(
    '/car-models',
    makeCallback(carBasicsSettingsControllers.getModels)
  );

  router.get(
    '/car-models-by-maker/:makerId',
    makeCallback(carBasicsSettingsControllers.getCarModelsByMaker)
  );

  router.get(
    '/odometer-range',
    makeCallback(carBasicsSettingsControllers.getOdometer)
  );

  router.get(
    '/transmissions',
    makeCallback(carBasicsSettingsControllers.getTrasmission)
  );

  router.get(
    '/advance-notice',
    makeCallback(carBasicsSettingsControllers.getAdvanceNotice)
  );

  router.get(
    '/min-trip',
    makeCallback(carBasicsSettingsControllers.getMinTrip)
  );

  router.get(
    '/max-trip',
    makeCallback(carBasicsSettingsControllers.getMaxTrip)
  );

  router.get(
    '/features-opts',
    makeCallback(carBasicsSettingsControllers.getFeaturesOpts)
  );

  router.get(
    '/car-category',
    makeCallback(carBasicsSettingsControllers.getCarCategories)
  );

  router.post(
    '/set-car-features',
    verifyToken,
    authorize([Normal]),
    makeCallback(carBasicsSettingsControllers.postCarFeatures)
  );

  router.post(
    '/set-car-image',
    verifyToken,
    upload.single('file'),
    authorize([Normal]),
    makeCallback(carBasicsSettingsControllers.postCarImage)
  );

  router.put(
    '/set-owner-car-image',
    verifyToken,
    authorize([Normal]),
    makeCallback(carBasicsSettingsControllers.putOwnerCarImage)
  );

  router.delete(
    '/car-image/:carImageId',
    verifyToken,
    authorize([Normal]),
    makeCallback(carBasicsSettingsControllers.deleteCarImage)
  );

  return router;
}

export default getCarBasicsRoutes;
