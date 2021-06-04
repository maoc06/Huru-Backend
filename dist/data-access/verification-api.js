"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeVerifySmsApi;

var _config = require("../../config");

function makeVerifySmsApi(client) {
  function sendVerificationSms(phoneNumber) {
    return client.verify.services(_config.config.twilioVerifyServiceId).verifications.create({
      locale: 'es',
      to: `+${phoneNumber}`,
      channel: 'sms'
    });
  }

  function sendVerificationVoice(phoneNumber) {
    return client.verify.services(_config.config.twilioVerifyServiceId).verifications.create({
      locale: 'es',
      to: `+${phoneNumber}`,
      channel: 'call'
    });
  }

  function checkVerificationCode(phoneNumber, code) {
    return client.verify.services(_config.config.twilioVerifyServiceId).verificationChecks.create({
      to: `+${phoneNumber}`,
      code
    });
  }

  return Object.freeze({
    sendVerificationSms,
    sendVerificationVoice,
    checkVerificationCode
  });
}