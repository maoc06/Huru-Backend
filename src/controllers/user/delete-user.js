export default function makeDeleteUser({ destroyUser }) {
  return async function deleteUser(httpRequest) {
    const headers = {
      'Content-Type': 'application/json',
    };

    try {
      const { email } = httpRequest.params;
      await destroyUser({ email });

      return {
        headers,
        statusCode: 201,
        body: {
          message: 'User successfully deleted',
        },
      };
    } catch (e) {
      console.log(e);
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
