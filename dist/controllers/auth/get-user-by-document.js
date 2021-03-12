"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeGetUserByDocument;

function makeGetUserByDocument({
  listUserByDocument
}) {
  return async function getUserByDocument(httpRequest) {
    const headers = {
      'Content-Type': 'application/json'
    };
    const {
      id: document
    } = httpRequest.params;

    try {
      const user = await listUserByDocument({
        document
      });
      return {
        headers,
        statusCode: 200,
        body: {
          message: 'Retrieve a user by document id',
          data: user
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