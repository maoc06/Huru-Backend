"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _useCases = require("../../use-cases");

var _getBooking = _interopRequireDefault(require("./get-booking"));

var _getByUserOwner = _interopRequireDefault(require("./get-by-user-owner"));

var _getUpcomingBookings = _interopRequireDefault(require("./get-upcoming-bookings"));

var _getHistoryBookings = _interopRequireDefault(require("./get-history-bookings"));

var _getCountCompletedTrips = _interopRequireDefault(require("./get-count-completed-trips"));

var _getCountCompletedTripsByCar = _interopRequireDefault(require("./get-count-completed-trips-by-car"));

var _postBooking = _interopRequireDefault(require("./post-booking"));

var _putConfirmBooking = _interopRequireDefault(require("./put-confirm-booking"));

var _putCancelBooking = _interopRequireDefault(require("./put-cancel-booking"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  listBooking,
  listByUserOwner,
  listUpcomingBookings,
  listBookingsHistory,
  countCompletedTrips,
  countCompletedTripsByCar,
  cancelBooking,
  addBooking,
  updateConfirmBooking
} = _useCases.bookingUseCases;
const getBooking = (0, _getBooking.default)({
  listBooking
});
const getByUserOwner = (0, _getByUserOwner.default)({
  listByUserOwner
});
const getUpcomingBookings = (0, _getUpcomingBookings.default)({
  listUpcomingBookings
});
const getBookingsHistory = (0, _getHistoryBookings.default)({
  listBookingsHistory
});
const getCountCompletedTrips = (0, _getCountCompletedTrips.default)({
  countCompletedTrips
});
const getCountCompletedTripsByCar = (0, _getCountCompletedTripsByCar.default)({
  countCompletedTripsByCar
});
const postBooking = (0, _postBooking.default)({
  addBooking
});
const putConfirmBooking = (0, _putConfirmBooking.default)({
  updateConfirmBooking
});
const putCancelBooking = (0, _putCancelBooking.default)({
  cancelBooking
});
var _default = {
  getBooking,
  getByUserOwner,
  getUpcomingBookings,
  getBookingsHistory,
  getCountCompletedTrips,
  getCountCompletedTripsByCar,
  postBooking,
  putConfirmBooking,
  putCancelBooking
};
exports.default = _default;