export default function makeGetUserByEmail({ listUserByEmail }) {
  return async function getUserByEmail(httpRequest) {
    const headers = {
      'Content-Type': 'application/json',
    };

    const { email } = httpRequest.params;

    try {
      const user = await listUserByEmail({ email });
      return {
        headers,
        statusCode: 200,
        body: {
          message: 'Retrieve a user by email',
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
