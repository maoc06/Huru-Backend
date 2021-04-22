export default function makeGetIfAlreadyReviewed({ listIfAlreadyReviewed }) {
  return async function getIfAlreadyReviewed(httpRequest) {
    const headers = {
      'Content-Type': 'application/json',
    };

    const { bookingId } = httpRequest.params;

    try {
      const alreadyReviewed = await listIfAlreadyReviewed({ bookingId });
      return {
        headers,
        statusCode: 200,
        body: {
          message: 'Retrieve if already reviewed',
          data: alreadyReviewed,
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
