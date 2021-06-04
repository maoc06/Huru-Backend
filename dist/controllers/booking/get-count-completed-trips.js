"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeGetCountCompletedTrips;

function makeGetCountCompletedTrips({
  countCompletedTrips
}) {
  return async function getCountCompletedTrips(httpRequest) {
    const headers = {
      'Content-Type': 'application/json'
    };
    const {
      userId
    } = httpRequest.params;

    try {
      const count = await countCompletedTrips({
        userId
      });
      return {
        headers,
        statusCode: 200,
        body: {
          message: 'Count completed trips by user',
          count
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