import express from 'express';
import makeCallback from '../express-callback';

import authorize from '../utils/middlewares/authorization';
import { Admin } from '../utils/role';
import verifyToken from '../utils/middlewares/verify-token';

import { cityControllers } from '../controllers';

function getCityRoutes() {
  const router = express.Router();

  router.get('/', makeCallback(cityControllers.getCities));

  router.get('/:id', makeCallback(cityControllers.getCities));

  router.post(
    '/',
    verifyToken,
    authorize([Admin]),
    makeCallback(cityControllers.postCity)
  );

  router.put(
    '/',
    verifyToken,
    authorize([Admin]),
    makeCallback(cityControllers.putCity)
  );

  return router;
}

export default getCityRoutes;
