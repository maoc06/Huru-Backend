import express from 'express';
import makeCallback from '../express-callback';
import authorize from '../utils/middlewares/authorization';
import { Normal, Admin } from '../utils/role';

import { userControllers } from '../controllers';

function getUserRoutes() {
  const router = express.Router();

  router.get('/:uuid', makeCallback(userControllers.getUser));

  return router;
}

export default getUserRoutes;
