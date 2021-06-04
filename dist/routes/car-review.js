"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _expressCallback = _interopRequireDefault(require("../express-callback"));

var _authorization = _interopRequireDefault(require("../utils/middlewares/authorization"));

var _role = require("../utils/role");

var _verifyToken = _interopRequireDefault(require("../utils/middlewares/verify-token"));

var _controllers = require("../controllers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getCarReviewRoutes() {
  const router = _express.default.Router();

  router.get('/:carId', (0, _expressCallback.default)(_controllers.carReviewControllers.getByCar));
  router.get('/already-reviewed/:bookingId', (0, _expressCallback.default)(_controllers.carReviewControllers.getIfAlreadyReviewed));
  router.get('/all-by-user/:userId', (0, _expressCallback.default)(_controllers.carReviewControllers.getAllReviewsByCar));
  router.post('/', _verifyToken.default, (0, _authorization.default)([_role.Normal]), (0, _expressCallback.default)(_controllers.carReviewControllers.postReview));
  return router;
}

var _default = getCarReviewRoutes;
exports.default = _default;