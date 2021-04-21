export default function makePatchBookingTerms({ updateBookingTerms }) {
  return async function patchBookingTerms(httpRequest) {
    const headers = {
      'Content-Type': 'application/json',
    };

    const carData = httpRequest.body;

    try {
      const car = await updateBookingTerms({ carData });
      return {
        headers,
        statusCode: 200,
        body: {
          message: 'Update booking terms successfully',
          data: car,
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
