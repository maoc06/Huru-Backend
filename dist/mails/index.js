"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _welcomeMail = _interopRequireDefault(require("./welcome-mail"));

var _bookingRequestEmail = _interopRequireDefault(require("./booking-request-email"));

var _bookingAcceptedEmail = _interopRequireDefault(require("./booking-accepted-email"));

var _bookingRejectedEmail = _interopRequireDefault(require("./booking-rejected-email"));

var _receiptEmail = _interopRequireDefault(require("./receipt-email"));

var _paymentDeclined = _interopRequireDefault(require("./payment-declined"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const sendWelcomeMail = (0, _welcomeMail.default)();
const sendBookingRequestMail = (0, _bookingRequestEmail.default)();
const sendBookingAcceptedtMail = (0, _bookingAcceptedEmail.default)();
const sendBookingRejectedMail = (0, _bookingRejectedEmail.default)();
const sendReceiptMail = (0, _receiptEmail.default)();
const sendPaymentDeclinedMail = (0, _paymentDeclined.default)();
var _default = {
  sendWelcomeMail,
  sendBookingRequestMail,
  sendBookingAcceptedtMail,
  sendBookingRejectedMail,
  sendReceiptMail,
  sendPaymentDeclinedMail
};
exports.default = _default;