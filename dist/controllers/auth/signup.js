"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeSignUp;

function makeSignUp({
  authRegister
}) {
  return async function signUp(httpRequest) {
    try {
      const { ...userInfo
      } = httpRequest.body;
      const accessToken = await authRegister({ ...userInfo
      });
      return {
        headers: {
          'Content-Type': 'application/json'
        },
        statusCode: 201,
        body: {
          message: 'User successfully register',
          accessToken
        }
      };
    } catch (e) {
      console.log(e);
      return {
        headers: {
          'Content-Type': 'application/json'
        },
        statusCode: 400,
        body: {
          error: e.message
        }
      };
    }
  };
}