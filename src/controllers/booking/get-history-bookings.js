export default function makeGetBookingsHistory({ listBookingsHistory }) {
  return async function getBookingsHistory(httpRequest) {
    const headers = {
      'Content-Type': 'application/json',
    };

    const { uuid } = httpRequest.params;

    try {
      const bookings = await listBookingsHistory({ uuid });
      return {
        headers,
        statusCode: 200,
        body: {
          message: 'List booking history by user',
          data: bookings,
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
