export default function makeSignUpGoogle({ authRegisterGoogle }) {
  return async function signUpGoogle(httpRequest) {
    const headers = {
      'Content-Type': 'application/json',
    };

    try {
      const { token } = httpRequest.body;

      const auth = await authRegisterGoogle({ token });

      return {
        headers,
        statusCode: 200,
        body: {
          message: 'Auth Google validated',
          data: auth,
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
