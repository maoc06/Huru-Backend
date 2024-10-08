"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _useCases = require("../../use-cases");

var _signup = _interopRequireDefault(require("./signup"));

var _signin = _interopRequireDefault(require("./signin"));

var _getUserByEmail = _interopRequireDefault(require("./get-user-by-email"));

var _getUserByDocument = _interopRequireDefault(require("./get-user-by-document"));

var _getUserByPhone = _interopRequireDefault(require("./get-user-by-phone"));

var _getSendVerificationSms = _interopRequireDefault(require("./get-send-verification-sms"));

var _getCheckVerifyCode = _interopRequireDefault(require("./get-check-verify-code"));

var _getCheckEmail = _interopRequireDefault(require("./get-check-email"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  authRegister,
  authLogin,
  listUserByEmail,
  listUserByDocument,
  listUserByPhone,
  sendVerificationSms,
  checkVerifyCode,
  checkEmail
} = _useCases.authUseCases;
const signUp = (0, _signup.default)({
  authRegister
});
const singIn = (0, _signin.default)({
  authLogin
});
const getUserByEmail = (0, _getUserByEmail.default)({
  listUserByEmail
});
const getUserByDocument = (0, _getUserByDocument.default)({
  listUserByDocument
});
const getUserByPhone = (0, _getUserByPhone.default)({
  listUserByPhone
});
const getSendVerificationSMS = (0, _getSendVerificationSms.default)({
  sendVerificationSms
});
const getCheckVerifyCode = (0, _getCheckVerifyCode.default)({
  checkVerifyCode
});
const getCheckEmail = (0, _getCheckEmail.default)({
  checkEmail
});
var _default = {
  signUp,
  singIn,
  getUserByEmail,
  getUserByDocument,
  getUserByPhone,
  getSendVerificationSMS,
  getCheckVerifyCode,
  getCheckEmail
};
exports.default = _default;