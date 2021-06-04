"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makePostBooking;

function makePostBooking({
  addBooking
}) {
  return async function postBooking(httpRequest) {
    const headers = {
      'Content-Type': 'application/json'
    };

    try {
      const { ...bookingInfo
      } = httpRequest.body;
      const booking = await addBooking({ ...bookingInfo
      });
      return {
        headers,
        statusCode: 201,
        body: {
          message: 'Booking successfully',
          data: booking
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