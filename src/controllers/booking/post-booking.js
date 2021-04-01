export default function makePostBooking({ addBooking }) {
  return async function postBooking(httpRequest) {
    const headers = {
      'Content-Type': 'application/json',
    };

    try {
      const { ...bookingInfo } = httpRequest.body;
      const booking = await addBooking({ ...bookingInfo });

      return {
        headers,
        statusCode: 201,
        body: {
          message: 'Booking successfully',
          data: booking,
        },
      };
    } catch (e) {
      return {
        headers,
        statusCode: 400,
        body: {
          error: e.message,
        },
      };
    }
  };
}
