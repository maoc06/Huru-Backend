"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _addPaymentSourceCard = _interopRequireDefault(require("./add-payment-source-card"));

var _addPaymentSourceNequi = _interopRequireDefault(require("./add-payment-source-nequi"));

var _addTransaction = _interopRequireDefault(require("./add-transaction"));

var _listenTransactionEvents = _interopRequireDefault(require("./listen-transaction-events"));

var _mails = _interopRequireDefault(require("../../mails"));

var _dataAccess = require("../../data-access");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  sendReceiptMail,
  sendPaymentDeclinedMail
} = _mails.default;
const addPaymentSourceCard = (0, _addPaymentSourceCard.default)({
  paymentGateway: _dataAccess.paymentGateway
});
const addPaymentSourceNequi = (0, _addPaymentSourceNequi.default)({
  paymentGateway: _dataAccess.paymentGateway
});
const addTransaction = (0, _addTransaction.default)({
  paymentGateway: _dataAccess.paymentGateway
});
const listenTransactionEvents = (0, _listenTransactionEvents.default)({
  transactionDb: _dataAccess.transactionDb,
  bookingDb: _dataAccess.bookingDb,
  userDb: _dataAccess.userDb,
  carDb: _dataAccess.carDb,
  paymentUserDb: _dataAccess.paymentUserDb,
  sendReceiptMail,
  sendPaymentDeclinedMail
});
var _default = {
  addPaymentSourceCard,
  addPaymentSourceNequi,
  addTransaction,
  listenTransactionEvents
};
exports.default = _default;