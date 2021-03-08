import express from 'express';
import makeCallback from '../express-callback';
import authorize from '../utils/middlewares/authorization';
import { Normal, Admin } from '../utils/role';

import { makerControllers } from '../controllers';

function getMakerRoutes() {
  const router = express.Router();

  router.get(
    '/',
    authorize([Normal, Admin]),
    makeCallback(makerControllers.getMakers)
  );

  router.get(
    '/:id',
    authorize([Normal, Admin]),
    makeCallback(makerControllers.getMakers)
  );

  return router;
}

export default getMakerRoutes;
