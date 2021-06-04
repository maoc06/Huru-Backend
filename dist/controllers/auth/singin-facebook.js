"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeSignInFacebook;

function makeSignInFacebook({
  authLoginFacebook
}) {
  return async function signInFacebook(httpRequest) {
    const headers = {
      'Content-Type': 'application/json'
    };

    try {
      const {
        email
      } = httpRequest.body;
      const accessToken = await authLoginFacebook(email);
      return {
        headers,
        statusCode: 200,
        body: {
          message: 'Auth Facebook validated',
          accessToken
        }
      };
    } catch (e) {
      return {
        headers,
        statusCode: 400,
        body: {
          error: e.message
        }
      };
    }
  };
}