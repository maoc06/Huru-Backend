import express from 'express';
import makeCallback from '../express-callback';
import authorize from '../utils/middlewares/authorization';
import { Normal, Admin } from '../utils/role';

import { cityControllers } from '../controllers';

function getCityRoutes() {
  const router = express.Router();

  router.get(
    '/',
    authorize([Normal, Admin]),
    makeCallback(cityControllers.getCities)
  );

  router.get(
    '/:id',
    authorize([Normal, Admin]),
    makeCallback(cityControllers.getCities)
  );

  router.post('/', authorize([Admin]), makeCallback(cityControllers.postCity));

  router.put('/', authorize([Admin]), makeCallback(cityControllers.putCity));

  return router;
}

export default getCityRoutes;
