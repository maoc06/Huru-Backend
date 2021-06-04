"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "paymentUser", {
  enumerable: true,
  get: function () {
    return _paymentUser.default;
  }
});
Object.defineProperty(exports, "transaction", {
  enumerable: true,
  get: function () {
    return _transaction.default;
  }
});

var _client = _interopRequireDefault(require("../../client"));

var _paymentUser = _interopRequireDefault(require("./payment-user"));

var _transaction = _interopRequireDefault(require("./transaction"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const paymentUser = (0, _paymentUser.default)(_client.default);
const transaction = (0, _transaction.default)(_client.default);