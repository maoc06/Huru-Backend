"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _listByUserOwner = _interopRequireDefault(require("./list-by-user-owner"));

var _listBooking = _interopRequireDefault(require("./list-booking"));

var _listUpcomingBookings = _interopRequireDefault(require("./list-upcoming-bookings"));

var _listHistoryBookings = _interopRequireDefault(require("./list-history-bookings"));

var _countCompletedTrips = _interopRequireDefault(require("./count-completed-trips"));

var _countCompletedTripsByCar = _interopRequireDefault(require("./count-completed-trips-by-car"));

var _addBooking = _interopRequireDefault(require("./add-booking"));

var _cancelBooking = _interopRequireDefault(require("./cancel-booking"));

var _updateConfirmBooking = _interopRequireDefault(require("./update-confirm-booking"));

var _mails = _interopRequireDefault(require("../../mails"));

var _dataAccess = require("../../data-access");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  sendBookingRequestMail,
  sendBookingAcceptedtMail,
  sendBookingRejectedMail
} = _mails.default;
const listByUserOwner = (0, _listByUserOwner.default)({
  bookingDb: _dataAccess.bookingDb,
  userDb: _dataAccess.userDb
});
const listBooking = (0, _listBooking.default)({
  bookingDb: _dataAccess.bookingDb
});
const listUpcomingBookings = (0, _listUpcomingBookings.default)({
  bookingDb: _dataAccess.bookingDb,
  userDb: _dataAccess.userDb
});
const listBookingsHistory = (0, _listHistoryBookings.default)({
  bookingDb: _dataAccess.bookingDb,
  userDb: _dataAccess.userDb,
  carReviewDb: _dataAccess.carReviewDb
});
const countCompletedTrips = (0, _countCompletedTrips.default)({
  bookingDb: _dataAccess.bookingDb,
  userDb: _dataAccess.userDb
});
const countCompletedTripsByCar = (0, _countCompletedTripsByCar.default)({
  bookingDb: _dataAccess.bookingDb,
  carDb: _dataAccess.carDb
});
const cancelBooking = (0, _cancelBooking.default)({
  bookingDb: _dataAccess.bookingDb
});
const addBooking = (0, _addBooking.default)({
  bookingDb: _dataAccess.bookingDb,
  userDb: _dataAccess.userDb,
  carDb: _dataAccess.carDb,
  sendBookingRequestMail
});
const updateConfirmBooking = (0, _updateConfirmBooking.default)({
  bookingDb: _dataAccess.bookingDb,
  transactionDb: _dataAccess.transactionDb,
  carDb: _dataAccess.carDb,
  userDb: _dataAccess.userDb,
  paymentUserDb: _dataAccess.paymentUserDb,
  paymentGateway: _dataAccess.paymentGateway,
  sendBookingAcceptedtMail,
  sendBookingRejectedMail
});
var _default = {
  listByUserOwner,
  listBooking,
  listUpcomingBookings,
  listBookingsHistory,
  countCompletedTrips,
  countCompletedTripsByCar,
  cancelBooking,
  addBooking,
  updateConfirmBooking
};
exports.default = _default;