export default function makeGetCheckVerifyCode({ checkVerifyCode }) {
  return async function getCheckVerifyCode(httpRequest) {
    const headers = {
      'Content-Type': 'application/json',
    };

    const { phoneNumber } = httpRequest.params;
    const { code } = httpRequest.params;

    try {
      const res = await checkVerifyCode(phoneNumber, code);
      return {
        headers,
        statusCode: 200,
        body: {
          message: 'Check code',
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
