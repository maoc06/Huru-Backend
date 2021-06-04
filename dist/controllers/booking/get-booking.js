"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeBooking;

function makeBooking({
  listBooking
}) {
  return async function getBooking(httpRequest) {
    const headers = {
      'Content-Type': 'application/json'
    };
    const {
      id
    } = httpRequest.params;

    try {
      const booking = await listBooking({
        id
      });
      return {
        headers,
        statusCode: 200,
        body: {
          message: 'Retrieve booking',
          data: booking
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