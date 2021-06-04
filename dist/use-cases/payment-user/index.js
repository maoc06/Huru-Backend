"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _listPaymentById = _interopRequireDefault(require("./list-payment-by-id"));

var _listPaymentByUser = _interopRequireDefault(require("./list-payment-by-user"));

var _listDefaultPaymentByUser = _interopRequireDefault(require("./list-default-payment-by-user"));

var _updateDefaultPayment = _interopRequireDefault(require("./update-default-payment"));

var _updateDisablePayment = _interopRequireDefault(require("./update-disable-payment"));

var _dataAccess = require("../../data-access");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const listPaymentById = (0, _listPaymentById.default)({
  paymentUserDb: _dataAccess.paymentUserDb
});
const listPaymentByUser = (0, _listPaymentByUser.default)({
  paymentUserDb: _dataAccess.paymentUserDb,
  userDb: _dataAccess.userDb
});
const listDefaultPaymentByUser = (0, _listDefaultPaymentByUser.default)({
  paymentUserDb: _dataAccess.paymentUserDb,
  userDb: _dataAccess.userDb
});
const updateDefaultPayment = (0, _updateDefaultPayment.default)({
  paymentUserDb: _dataAccess.paymentUserDb
});
const updateDisablePayment = (0, _updateDisablePayment.default)({
  paymentUserDb: _dataAccess.paymentUserDb
});
var _default = {
  listPaymentById,
  listPaymentByUser,
  listDefaultPaymentByUser,
  updateDefaultPayment,
  updateDisablePayment
};
exports.default = _default;