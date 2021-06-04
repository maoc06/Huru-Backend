"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _expressCallback = _interopRequireDefault(require("../express-callback"));

var _controllers = require("../controllers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getPaymentUserRoutes() {
  const router = _express.default.Router();

  router.get('/:id', (0, _expressCallback.default)(_controllers.paymentUserControllers.getPaymentById));
  router.get('/by-user/:id', (0, _expressCallback.default)(_controllers.paymentUserControllers.getPaymentByUser));
  router.get('/default/:id', (0, _expressCallback.default)(_controllers.paymentUserControllers.getDefaultPaymentByUser));
  router.put('/default', (0, _expressCallback.default)(_controllers.paymentUserControllers.putDefaultPayment));
  router.patch('/disable', (0, _expressCallback.default)(_controllers.paymentUserControllers.patchDisablePayment));
  return router;
}

var _default = getPaymentUserRoutes;
exports.default = _default;