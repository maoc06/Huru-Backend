"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeGetCar;

function makeGetCar({
  listCar
}) {
  return async function getCar(httpRequest) {
    const headers = {
      'Content-Type': 'application/json'
    };
    const {
      carId
    } = httpRequest.params;

    try {
      const car = await listCar({
        carId
      });
      return {
        headers,
        statusCode: 200,
        body: {
          message: 'Retrieve Car by ID',
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