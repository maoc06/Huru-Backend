export default function makeGetSendVerificationSMS({ sendVerificationSms }) {
  return async function getSendVerificationSMS(httpRequest) {
    const headers = {
      'Content-Type': 'application/json',
    };

    const { phoneNumber } = httpRequest.params;

    try {
      const res = await sendVerificationSms(phoneNumber);
      return {
        headers,
        statusCode: 200,
        body: {
          message: 'SMS verification sent',
          data: res,
        },
      };
    } catch (e) {
      return {
        headers,
        statusCode: 400,
        body: {
          error: e.message,
        },
      };
    }
  };
}
