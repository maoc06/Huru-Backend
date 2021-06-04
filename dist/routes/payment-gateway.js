"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _expressCallback = _interopRequireDefault(require("../express-callback"));

var _controllers = require("../controllers");

var _verifyToken = _interopRequireDefault(require("../utils/middlewares/verify-token"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getPaymentGatewaysRoutes() {
  const router = _express.default.Router();

  router.post('/source-card', _verifyToken.default, (0, _expressCallback.default)(_controllers.paymentControllers.postPaymentSourceCard));
  router.post('/source-nequi', _verifyToken.default, (0, _expressCallback.default)(_controllers.paymentControllers.postPaymentSourceNequi));
  router.post('/transaction', _verifyToken.default, (0, _expressCallback.default)(_controllers.paymentControllers.postTransaction));
  router.post('/events', (0, _expressCallback.default)(_controllers.paymentControllers.postTransactionEvents));
  return router;
}

var _default = getPaymentGatewaysRoutes;
exports.default = _default;