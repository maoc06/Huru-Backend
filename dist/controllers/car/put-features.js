"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makePutFeatures;

function makePutFeatures({
  updateFeatures
}) {
  return async function putFeatures(httpRequest) {
    const headers = {
      'Content-Type': 'application/json'
    };
    const data = httpRequest.body;

    try {
      const carFeatures = await updateFeatures({
        data
      });
      return {
        headers,
        statusCode: 200,
        body: {
          message: 'Update car features successfully',
          data: carFeatures
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