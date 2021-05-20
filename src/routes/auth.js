import express from 'express';

import makeCallback from '../express-callback';
import { authControllers } from '../controllers';

function getAuthRoutes() {
  const router = express.Router();

  router.post('/signup', makeCallback(authControllers.signUp));

  router.post('/signin', makeCallback(authControllers.singIn));

  router.post('/signup-google', makeCallback(authControllers.signUpGoogle));

  router.post('/signin-facebook', makeCallback(authControllers.signInFacebook));

  router.post('/signin-google', makeCallback(authControllers.signInGoogle));

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

  router.get(
    '/send-verify-sms/:phoneNumber',
    makeCallback(authControllers.getSendVerificationSMS)
  );

  router.get(
    '/check-verify-code/:phoneNumber/:code',
    makeCallback(authControllers.getCheckVerifyCode)
  );

  router.get(
    '/check-verify-email/:token',
    makeCallback(authControllers.getCheckEmail)
  );

  return router;
}

export default getAuthRoutes;
