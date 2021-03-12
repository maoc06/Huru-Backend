"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeGetMinTrip;

function makeGetMinTrip({
  listMinTrip
}) {
  return async function getMinTrip() {
    const headers = {
      'Content-Type': 'application/json'
    };

    try {
      const minTrip = await listMinTrip();
      return {
        headers,
        statusCode: 200,
        body: {
          message: 'List of min trip duration options',
          data: minTrip
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