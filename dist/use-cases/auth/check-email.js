"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeCheckEmail;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _config = require("../../../config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function makeCheckEmail({
  userDb
}) {
  return async function checkEmail(token) {
    if (!token) throw new Error('Token null');

    try {
      const res = _jsonwebtoken.default.verify(token, _config.config.emailPrivateKey);

      return await userDb.updateEmailVerification(res.info.email, true);
    } catch (error) {
      throw new Error('Verify-email-token-not-valid');
    }
  };
}