export default function makeSignInGoogle({ authLoginGoogle }) {
  return async function signInGoogle(httpRequest) {
    const headers = {
      'Content-Type': 'application/json',
    };

    try {
      const { token } = httpRequest.body;

      const accessToken = await authLoginGoogle({ token });

      return {
        headers,
        statusCode: 200,
        body: {
          message: 'Auth Google successfully',
          accessToken,
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
