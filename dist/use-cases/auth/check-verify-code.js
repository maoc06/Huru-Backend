"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeCheckVerifyCode;

function makeCheckVerifyCode({
  verificationApi
}) {
  return async function checkVerifyCode(phoneNumber, code) {
    if (!phoneNumber) throw new Error('Phone number is null');
    if (!code) throw new Error('Verification code is null');
    const res = await verificationApi.checkVerificationCode(phoneNumber, code);
    return res;
  };
}