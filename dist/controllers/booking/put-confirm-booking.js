"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makePutConfirmBooking;

function makePutConfirmBooking({
  updateConfirmBooking
}) {
  return async function putConfirmBooking(httpRequest) {
    const headers = {
      'Content-Type': 'application/json'
    };

    try {
      const { ...bookingConfirmInfo
      } = httpRequest.body;
      const bookingConfirm = await updateConfirmBooking({ ...bookingConfirmInfo
      });
      return {
        headers,
        statusCode: 201,
        body: {
          message: 'Booking successfully',
          data: bookingConfirm
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