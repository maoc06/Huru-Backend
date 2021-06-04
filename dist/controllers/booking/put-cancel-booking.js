"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makePutCancelBooking;

function makePutCancelBooking({
  cancelBooking
}) {
  return async function putCancelBooking(httpRequest) {
    const headers = {
      'Content-Type': 'application/json'
    };

    try {
      const { ...bookingInfo
      } = httpRequest.body;
      const booking = await cancelBooking({ ...bookingInfo
      });
      return {
        headers,
        statusCode: 201,
        body: {
          message: 'Booking cancelled succesfully',
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