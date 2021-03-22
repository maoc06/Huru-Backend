import express from 'express';
import makeCallback from '../express-callback';

import { carControllers } from '../controllers';

function getSearchRoutes() {
  const router = express.Router();

  router.get(
    '/by-city/:city/:checkIn/:checkOut',
    makeCallback(carControllers.getCarsByCity)
  );

  return router;
}

export default getSearchRoutes;
