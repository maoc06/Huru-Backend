export default function makePatchPhone({ updatePhone }) {
  return async function patchPhone(httpRequest) {
    const headers = {
      'Content-Type': 'application/json',
    };

    const phoneData = httpRequest.body;

    try {
      const user = await updatePhone({ phoneData });
      return {
        headers,
        statusCode: 200,
        body: {
          message: 'Update user phone successfully',
          data: user,
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
