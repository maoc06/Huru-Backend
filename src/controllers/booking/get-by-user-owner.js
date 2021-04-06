export default function makeGetByUserOwner({ listByUserOwner }) {
  return async function getByUserOwner(httpRequest) {
    const headers = {
      'Content-Type': 'application/json',
    };

    const { uuid } = httpRequest.params;

    try {
      const bookingRequests = await listByUserOwner({ uuid });
      return {
        headers,
        statusCode: 200,
        body: {
          message: 'List bookings request by user owner',
          data: bookingRequests,
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
