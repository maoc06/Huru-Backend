"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _useCases = require("../../use-cases");

var _getPaymentById = _interopRequireDefault(require("./get-payment-by-id"));

var _getPaymentByUser = _interopRequireDefault(require("./get-payment-by-user"));

var _getDefaultPaymentByUser = _interopRequireDefault(require("./get-default-payment-by-user"));

var _putDefaultPayment = _interopRequireDefault(require("./put-default-payment"));

var _patchDisablePayment = _interopRequireDefault(require("./patch-disable-payment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  listPaymentById,
  listPaymentByUser,
  listDefaultPaymentByUser,
  updateDefaultPayment,
  updateDisablePayment
} = _useCases.paymentUserUseCases;
const getPaymentById = (0, _getPaymentById.default)({
  listPaymentById
});
const getPaymentByUser = (0, _getPaymentByUser.default)({
  listPaymentByUser
});
const getDefaultPaymentByUser = (0, _getDefaultPaymentByUser.default)({
  listDefaultPaymentByUser
});
const putDefaultPayment = (0, _putDefaultPayment.default)({
  updateDefaultPayment
});
const patchDisablePayment = (0, _patchDisablePayment.default)({
  updateDisablePayment
});
var _default = {
  getPaymentById,
  getPaymentByUser,
  getDefaultPaymentByUser,
  putDefaultPayment,
  patchDisablePayment
};
exports.default = _default;