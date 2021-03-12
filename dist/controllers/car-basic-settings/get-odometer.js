"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeGetOdometer;

function makeGetOdometer({
  listOdometer
}) {
  return async function getOdometer() {
    const headers = {
      'Content-Type': 'application/json'
    };

    try {
      const odometer = await listOdometer();
      return {
        headers,
        statusCode: 200,
        body: {
          message: 'List of odometer ranges',
          data: odometer
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