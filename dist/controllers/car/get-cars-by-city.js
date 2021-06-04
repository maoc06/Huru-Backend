"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeGetCarsByCity;

function makeGetCarsByCity({
  listCarsByCity
}) {
  return async function getCarsByCity(httpRequest) {
    const headers = {
      'Content-Type': 'application/json'
    };
    const {
      city,
      checkIn,
      checkOut
    } = httpRequest.params;

    try {
      const cars = await listCarsByCity({
        city,
        checkIn,
        checkOut
      });
      return {
        headers,
        statusCode: 200,
        body: {
          message: 'List Cars by city',
          data: cars
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