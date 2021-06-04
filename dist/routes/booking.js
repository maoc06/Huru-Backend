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

function getBookingRoutes() {
  const router = _express.default.Router();

  router.get('/:id', _verifyToken.default, (0, _authorization.default)([_role.Normal, _role.Admin]), (0, _expressCallback.default)(_controllers.bookingControllers.getBooking));
  router.get('/upcoming/:uuid', _verifyToken.default, (0, _authorization.default)([_role.Normal, _role.Admin]), (0, _expressCallback.default)(_controllers.bookingControllers.getUpcomingBookings));
  router.get('/history/:uuid', _verifyToken.default, (0, _authorization.default)([_role.Normal, _role.Admin]), (0, _expressCallback.default)(_controllers.bookingControllers.getBookingsHistory));
  router.get('/by-owner/:uuid/:limit', _verifyToken.default, (0, _authorization.default)([_role.Normal, _role.Admin]), (0, _expressCallback.default)(_controllers.bookingControllers.getByUserOwner));
  router.get('/count-completed-trips/:userId', (0, _expressCallback.default)(_controllers.bookingControllers.getCountCompletedTrips));
  router.get('/count-completed-trips-by-car/:carId', (0, _expressCallback.default)(_controllers.bookingControllers.getCountCompletedTripsByCar));
  router.post('/', _verifyToken.default, (0, _authorization.default)([_role.Normal, _role.Admin]), (0, _expressCallback.default)(_controllers.bookingControllers.postBooking));
  router.put('/confirm', _verifyToken.default, (0, _authorization.default)([_role.Normal, _role.Admin]), (0, _expressCallback.default)(_controllers.bookingControllers.putConfirmBooking));
  router.put('/cancel', _verifyToken.default, (0, _authorization.default)([_role.Normal, _role.Admin]), (0, _expressCallback.default)(_controllers.bookingControllers.putCancelBooking));
  return router;
}

var _default = getBookingRoutes;
exports.default = _default;