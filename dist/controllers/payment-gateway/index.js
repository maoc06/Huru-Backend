"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _useCases = require("../../use-cases");

var _postPaymentSourcesCard = _interopRequireDefault(require("./post-payment-sources-card"));

var _postPaymentSourcesNequi = _interopRequireDefault(require("./post-payment-sources-nequi"));

var _postTransaction = _interopRequireDefault(require("./post-transaction"));

var _postTransactionEvents = _interopRequireDefault(require("./post-transaction-events"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  addPaymentSourceCard,
  addPaymentSourceNequi,
  addTransaction,
  listenTransactionEvents
} = _useCases.paymentUseCases;
const postPaymentSourceCard = (0, _postPaymentSourcesCard.default)({
  addPaymentSourceCard
});
const postPaymentSourceNequi = (0, _postPaymentSourcesNequi.default)({
  addPaymentSourceNequi
});
const postTransaction = (0, _postTransaction.default)({
  addTransaction
});
const postTransactionEvents = (0, _postTransactionEvents.default)({
  listenTransactionEvents
});
var _default = {
  postPaymentSourceCard,
  postPaymentSourceNequi,
  postTransaction,
  postTransactionEvents
};
exports.default = _default;