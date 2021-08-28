export default function makeDeleteBooking({ destroyBooking }) {
  return async function deleteBooking(httpRequest) {
    const headers = {
      'Content-Type': 'application/json',
    };

    const { id } = httpRequest.params;

    try {
      await destroyBooking({ id });
      return {
        headers,
        statusCode: 200,
        body: {
          message: 'Booking successfully deleted',
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
