"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _authRegister = _interopRequireDefault(require("./auth-register"));

var _authLogin = _interopRequireDefault(require("./auth-login"));

var _listUserByEmail = _interopRequireDefault(require("./list-user-by-email"));

var _listUserByPhone = _interopRequireDefault(require("./list-user-by-phone"));

var _listUserByDocument = _interopRequireDefault(require("./list-user-by-document"));

var _sendVerifySms = _interopRequireDefault(require("./send-verify-sms"));

var _checkVerifyCode = _interopRequireDefault(require("./check-verify-code"));

var _checkEmail = _interopRequireDefault(require("./check-email"));

var _dataAccess = require("../../data-access");

var _handleToken = _interopRequireDefault(require("../../utils/handle-token"));

var _mails = _interopRequireDefault(require("../../mails"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const handleToken = (0, _handleToken.default)();
const {
  sendWelcomeMail
} = _mails.default;
const authRegister = (0, _authRegister.default)({
  authDb: _dataAccess.authDb,
  handleToken,
  sendWelcomeMail
});
const authLogin = (0, _authLogin.default)({
  authDb: _dataAccess.authDb,
  handleToken
});
const listUserByEmail = (0, _listUserByEmail.default)({
  authDb: _dataAccess.authDb
});
const listUserByPhone = (0, _listUserByPhone.default)({
  authDb: _dataAccess.authDb
});
const listUserByDocument = (0, _listUserByDocument.default)({
  authDb: _dataAccess.authDb
});
const sendVerificationSms = (0, _sendVerifySms.default)({
  verificationApi: _dataAccess.verificationApi
});
const checkVerifyCode = (0, _checkVerifyCode.default)({
  verificationApi: _dataAccess.verificationApi
});
const checkEmail = (0, _checkEmail.default)({
  userDb: _dataAccess.userDb
});
var _default = {
  authRegister,
  authLogin,
  listUserByEmail,
  listUserByDocument,
  listUserByPhone,
  sendVerificationSms,
  checkVerifyCode,
  checkEmail
};
exports.default = _default;