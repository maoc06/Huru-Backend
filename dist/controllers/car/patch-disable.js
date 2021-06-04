"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makePatchDisable;

function makePatchDisable({
  updateDisable
}) {
  return async function patchDisable(httpRequest) {
    const headers = {
      'Content-Type': 'application/json'
    };
    const carData = httpRequest.body;

    try {
      const car = await updateDisable({
        carData
      });
      return {
        headers,
        statusCode: 200,
        body: {
          message: 'Update disabled car successfully',
          data: car
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