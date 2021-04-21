export default function makePatchVisibility({ updateVisibility }) {
  return async function patchVisibility(httpRequest) {
    const headers = {
      'Content-Type': 'application/json',
    };

    const carData = httpRequest.body;

    try {
      const car = await updateVisibility({ carData });
      return {
        headers,
        statusCode: 200,
        body: {
          message: 'Update visibility car successfully',
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
