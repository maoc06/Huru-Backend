"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _expressCallback = _interopRequireDefault(require("../express-callback"));

var _controllers = require("../controllers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getAuthRoutes() {
  const router = _express.default.Router();

  router.post('/signup', (0, _expressCallback.default)(_controllers.authControllers.signUp));
  router.post('/signin', (0, _expressCallback.default)(_controllers.authControllers.singIn));
  router.post('/signup-google', (0, _expressCallback.default)(_controllers.authControllers.signUpGoogle));
  router.post('/signin-facebook', (0, _expressCallback.default)(_controllers.authControllers.signInFacebook));
  router.post('/signin-google', (0, _expressCallback.default)(_controllers.authControllers.signInGoogle));
  router.get('/check-email/:email', (0, _expressCallback.default)(_controllers.authControllers.getUserByEmail));
  router.get('/check-document/:id', (0, _expressCallback.default)(_controllers.authControllers.getUserByDocument));
  router.get('/check-phone/:phone', (0, _expressCallback.default)(_controllers.authControllers.getUserByPhone));
  router.get('/send-verify-sms/:phoneNumber', (0, _expressCallback.default)(_controllers.authControllers.getSendVerificationSMS));
  router.get('/check-verify-code/:phoneNumber/:code', (0, _expressCallback.default)(_controllers.authControllers.getCheckVerifyCode));
  router.get('/check-verify-email/:token', (0, _expressCallback.default)(_controllers.authControllers.getCheckEmail));
  return router;
}

var _default = getAuthRoutes;
exports.default = _default;