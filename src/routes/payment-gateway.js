import express from 'express';
import makeCallback from '../express-callback';

import { paymentControllers } from '../controllers';

import verifyToken from '../utils/middlewares/verify-token';

function getPaymentGatewaysRoutes() {
  const router = express.Router();

  router.post(
    '/source-card',
    verifyToken,
    makeCallback(paymentControllers.postPaymentSourceCard)
  );

  router.post(
    '/source-nequi',
    verifyToken,
    makeCallback(paymentControllers.postPaymentSourceNequi)
  );

  router.post(
    '/transaction',
    verifyToken,
    makeCallback(paymentControllers.postTransaction)
  );

  router.post(
    '/events',
    makeCallback(paymentControllers.postTransactionEvents)
  );

  return router;
}

export default getPaymentGatewaysRoutes;
