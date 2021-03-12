"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeGetCheckEmail;

function makeGetCheckEmail({
  checkEmail
}) {
  return async function getCheckEmail(httpRequest) {
    const headers = {
      'Content-Type': 'application/json'
    };
    const {
      token
    } = httpRequest.params;

    try {
      const res = await checkEmail(token);
      return {
        headers,
        statusCode: 200,
        body: {
          message: 'Check email',
          data: res
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