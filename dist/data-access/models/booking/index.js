"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "booking", {
  enumerable: true,
  get: function () {
    return _booking.default;
  }
});
Object.defineProperty(exports, "bookingStatus", {
  enumerable: true,
  get: function () {
    return _bookingStatus.default;
  }
});
exports.default = void 0;

var _client = _interopRequireDefault(require("../../client"));

var _booking = _interopRequireDefault(require("./booking"));

var _bookingStatus = _interopRequireDefault(require("./booking-status"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Booking = (0, _booking.default)(_client.default);
const BookingStatus = (0, _bookingStatus.default)(_client.default);
var _default = {
  Booking,
  BookingStatus
};
exports.default = _default;