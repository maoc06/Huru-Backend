import express from 'express';
import makeCallback from '../express-callback';

import { makerControllers } from '../controllers';

function getMakerRoutes() {
  const router = express.Router();

  router.get('/', makeCallback(makerControllers.getMakers));

  router.get('/:id', makeCallback(makerControllers.getMakers));

  return router;
}

export default getMakerRoutes;
