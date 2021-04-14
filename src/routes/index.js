import express from 'express';

import verifyToken from '../utils/middlewares/verify-token';

import getAuthRoutes from './auth';
import getUserRoutes from './user';
import getCarRoutes from './car';
import getMakerRoutes from './maker';
import getCarBasicsRoutes from './car-basic-settings';
import getCityRoutes from './city';
import getSearchRoutes from './search';
import getBookingRoutes from './booking';
import getPaymentUserRoutes from './payment-user';
import getPaymentGatewaysRoutes from './payment-gateway';
import getCarReviewRoutes from './car-review';

function getRoutes() {
  const router = express.Router();

  router.use('/auth', getAuthRoutes());

  router.use('/user', getUserRoutes());

  router.use('/car', getCarRoutes());

  router.use('/city', verifyToken, getCityRoutes());

  router.use('/maker', verifyToken, getMakerRoutes());

  router.use('/car-basics', verifyToken, getCarBasicsRoutes());

  router.use('/search', getSearchRoutes());

  router.use('/booking', verifyToken, getBookingRoutes());

  router.use('/payment-user', verifyToken, getPaymentUserRoutes());

  router.use('/payment', getPaymentGatewaysRoutes());

  router.use('/car-review', getCarReviewRoutes());

  return router;
}

export default getRoutes;
