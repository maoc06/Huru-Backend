export default function makeGetUserByPhone({ listUserByPhone }) {
  return async function getUserByPhone(httpRequest) {
    const headers = {
      'Content-Type': 'application/json',
    };

    const { phone } = httpRequest.params;

    try {
      const user = await listUserByPhone({ phone });
      return {
        headers,
        statusCode: 200,
        body: {
          message: 'Retrieve a user by phone',
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
