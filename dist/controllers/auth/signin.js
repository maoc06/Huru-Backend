"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeSignIn;

function makeSignIn({
  authLogin
}) {
  return async function signIn(httpRequest) {
    const headers = {
      'Content-Type': 'application/json'
    };

    try {
      const { ...credentials
      } = httpRequest.body;
      const auth = await authLogin({ ...credentials
      });
      return {
        headers,
        statusCode: 200,
        body: {
          token: auth
        }
      };
    } catch (e) {
      return {
        headers,
        statusCode: 403,
        body: {
          error: e.message
        }
      };
    }
  };
}