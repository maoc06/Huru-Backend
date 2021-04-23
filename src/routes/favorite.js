import express from 'express';
import makeCallback from '../express-callback';
import authorize from '../utils/middlewares/authorization';
import { Normal } from '../utils/role';

import { favoriteControllers } from '../controllers';

function getFavoriteRoutes() {
  const router = express.Router();

  router.get(
    '/by-user/:userId',
    authorize([Normal]),
    makeCallback(favoriteControllers.getByUser)
  );

  router.post(
    '/',
    authorize([Normal]),
    makeCallback(favoriteControllers.postFavorite)
  );

  return router;
}

export default getFavoriteRoutes;
