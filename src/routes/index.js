import express from 'express';

import verifyToken from '../utils/middlewares/verify-token';

import getAuthRoutes from './auth';
import getUserRoutes from './user';
import getCarRoutes from './car';
import getMakerRoutes from './maker';
import getCarBasicsRoutes from './car-basic-settings';
import getCityRoutes from './city';
import getSearchRoutes from './search';

function getRoutes() {
  const router = express.Router();

  router.use('/auth', getAuthRoutes());

  router.use('/user', verifyToken, getUserRoutes());

  router.use('/car', getCarRoutes());

  router.use('/city', verifyToken, getCityRoutes());

  router.use('/maker', verifyToken, getMakerRoutes());

  router.use('/car-basics', verifyToken, getCarBasicsRoutes());

  router.use('/search', getSearchRoutes());

  return router;
}

export default getRoutes;
