export default function makeGetCountCompletedTripsByCar({
  countCompletedTripsByCar,
}) {
  return async function getCountCompletedTripsByCar(httpRequest) {
    const headers = {
      'Content-Type': 'application/json',
    };

    const { carId } = httpRequest.params;

    try {
      const count = await countCompletedTripsByCar({ carId });
      return {
        headers,
        statusCode: 200,
        body: {
          message: 'Count completed trips by car',
          count,
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
