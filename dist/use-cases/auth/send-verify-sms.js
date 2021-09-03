Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = makeSendVerificationSMS;

function makeSendVerificationSMS({ verificationApi }) {
  return async function sendVerificationSMS(phoneNumber) {
    if (!phoneNumber) throw new Error('Phone number is null');
    const res = await verificationApi.sendVerificationSms(phoneNumber);
    return res;
  };
}
