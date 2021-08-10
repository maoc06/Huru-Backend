export default function makeGetCarByQuery({ listQuery }) {
  return async function getCarByQuery(httpRequest) {
    const headers = {
      'Content-Type': 'application/json',
    };

    const { query } = httpRequest.params;

    try {
      const cars = await listQuery({ query });
      return {
        headers,
        statusCode: 200,
        body: {
          message: 'List Cars by query',
          data: cars,
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
