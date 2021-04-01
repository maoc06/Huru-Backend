import { config } from '../../config';

export default function makeVerifySmsApi(client) {
  function sendVerificationSms(phoneNumber) {
    return client.verify
      .services(config.twilioVerifyServiceId)
      .verifications.create({
        locale: 'es',
        to: `+${phoneNumber}`,
        channel: 'sms',
      });
  }

  function sendVerificationVoice(phoneNumber) {
    return client.verify
      .services(config.twilioVerifyServiceId)
      .verifications.create({
        locale: 'es',
        to: `+${phoneNumber}`,
        channel: 'call',
      });
  }

  function checkVerificationCode(phoneNumber, code) {
    return client.verify
      .services(config.twilioVerifyServiceId)
      .verificationChecks.create({
        to: `+${phoneNumber}`,
        code,
      });
  }

  return Object.freeze({
    sendVerificationSms,
    sendVerificationVoice,
    checkVerificationCode,
  });
}
