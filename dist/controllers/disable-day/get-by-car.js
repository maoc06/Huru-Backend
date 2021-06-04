"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeGetByCar;

function makeGetByCar({
  listByCar
}) {
  return async function getByCar(httpRequest) {
    const headers = {
      'Content-Type': 'application/json'
    };
    const {
      carId
    } = httpRequest.params;

    try {
      const days = await listByCar({
        carId
      });
      return {
        headers,
        statusCode: 200,
        body: {
          message: 'List disabled days by car',
          data: days
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