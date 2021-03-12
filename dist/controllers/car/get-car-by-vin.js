"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeGetCarByVin;

function makeGetCarByVin({
  listByVin
}) {
  return async function getCarByVin(httpRequest) {
    const headers = {
      'Content-Type': 'application/json'
    };
    const {
      vin
    } = httpRequest.params;

    try {
      const car = await listByVin({
        vin
      });
      return {
        headers,
        statusCode: 200,
        body: {
          message: 'List Car by VIN',
          data: car
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