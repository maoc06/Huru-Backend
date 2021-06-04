"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeGetUser;

function makeGetUser({
  listUser
}) {
  return async function getUser(httpRequest) {
    const headers = {
      'Content-Type': 'application/json'
    };
    const {
      uuid
    } = httpRequest.params;

    try {
      const user = await listUser({
        uuid
      });
      return {
        headers,
        statusCode: 200,
        body: {
          message: 'Retrieve a user',
          data: user
        }
      };
    } catch (e) {
      console.log(e);
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