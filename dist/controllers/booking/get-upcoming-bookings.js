"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeGetUpcomingBookings;

function makeGetUpcomingBookings({
  listUpcomingBookings
}) {
  return async function getUpcomingBookings(httpRequest) {
    const headers = {
      'Content-Type': 'application/json'
    };
    const {
      uuid
    } = httpRequest.params;

    try {
      const bookings = await listUpcomingBookings({
        uuid
      });
      return {
        headers,
        statusCode: 200,
        body: {
          message: 'List upcoming bookings by user',
          data: bookings
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