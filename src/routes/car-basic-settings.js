import express from 'express';
import multer from 'multer';
import makeCallback from '../express-callback';
import authorize from '../utils/middlewares/authorization';
import { Normal, Admin } from '../utils/role';

import { carBasicsSettingsControllers } from '../controllers';

const storage = multer.memoryStorage();
const upload = multer({ storage });

function getCarBasicsRoutes() {
  const router = express.Router();

  router.get(
    '/car-models',
    authorize([Normal, Admin]),
    makeCallback(carBasicsSettingsControllers.getModels)
  );

  router.get(
    '/car-models-by-maker/:makerId',
    authorize([Normal, Admin]),
    makeCallback(carBasicsSettingsControllers.getCarModelsByMaker)
  );

  router.get(
    '/odometer-range',
    authorize([Normal, Admin]),
    makeCallback(carBasicsSettingsControllers.getOdometer)
  );

  router.get(
    '/transmissions',
    authorize([Normal, Admin]),
    makeCallback(carBasicsSettingsControllers.getTrasmission)
  );

  router.get(
    '/advance-notice',
    authorize([Normal, Admin]),
    makeCallback(carBasicsSettingsControllers.getAdvanceNotice)
  );

  router.get(
    '/min-trip',
    authorize([Normal, Admin]),
    makeCallback(carBasicsSettingsControllers.getMinTrip)
  );

  router.get(
    '/max-trip',
    authorize([Normal, Admin]),
    makeCallback(carBasicsSettingsControllers.getMaxTrip)
  );

  router.get(
    '/features-opts',
    authorize([Normal, Admin]),
    makeCallback(carBasicsSettingsControllers.getFeaturesOpts)
  );

  router.get(
    '/car-category',
    authorize([Normal, Admin]),
    makeCallback(carBasicsSettingsControllers.getCarCategories)
  );

  router.post(
    '/set-car-features',
    authorize([Normal]),
    makeCallback(carBasicsSettingsControllers.postCarFeatures)
  );

  router.post(
    '/set-car-image',
    upload.single('file'),
    authorize([Normal]),
    makeCallback(carBasicsSettingsControllers.postCarImage)
  );

  router.put(
    '/set-owner-car-image',
    authorize([Normal]),
    makeCallback(carBasicsSettingsControllers.putOwnerCarImage)
  );

  return router;
}

export default getCarBasicsRoutes;
