export default function makeGetByCar({ listByCar }) {
  return async function getByCar(httpRequest) {
    const headers = {
      'Content-Type': 'application/json',
    };

    const { carId } = httpRequest.params;

    try {
      const reviews = await listByCar({ carId });
      return {
        headers,
        statusCode: 200,
        body: {
          message: 'List car reviews',
          data: reviews,
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
