import express from 'express';
import makeCallback from '../express-callback';

import { paymentUserControllers } from '../controllers';

function getPaymentUserRoutes() {
  const router = express.Router();

  router.get('/:id', makeCallback(paymentUserControllers.getPaymentById));

  router.get(
    '/by-user/:id',
    makeCallback(paymentUserControllers.getPaymentByUser)
  );

  router.get(
    '/default/:id',
    makeCallback(paymentUserControllers.getDefaultPaymentByUser)
  );

  router.put(
    '/default',
    makeCallback(paymentUserControllers.putDefaultPayment)
  );

  router.patch(
    '/disable',
    makeCallback(paymentUserControllers.patchDisablePayment)
  );

  return router;
}

export default getPaymentUserRoutes;
