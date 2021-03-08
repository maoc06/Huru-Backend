import express from 'express';
import makeCallback from '../express-callback';
import { authControllers } from '../controllers';

function getAuthRoutes() {
  const router = express.Router();

  router.post('/signup', makeCallback(authControllers.signUp));

  router.post('/signin', makeCallback(authControllers.singIn));

  router.get(
    '/check-email/:email',
    makeCallback(authControllers.getUserByEmail)
  );

  router.get(
    '/check-document/:id',
    makeCallback(authControllers.getUserByDocument)
  );

  router.get(
    '/check-phone/:phone',
    makeCallback(authControllers.getUserByPhone)
  );

  return router;
}

export default getAuthRoutes;
