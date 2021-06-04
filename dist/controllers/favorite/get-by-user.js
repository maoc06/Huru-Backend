"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeGetByUser;

function makeGetByUser({
  listByUser
}) {
  return async function getByUser(httpRequest) {
    const headers = {
      'Content-Type': 'application/json'
    };
    const {
      userId
    } = httpRequest.params;

    try {
      const favorites = await listByUser({
        userId
      });
      return {
        headers,
        statusCode: 200,
        body: {
          message: 'List Favorite(s) by user',
          data: favorites
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