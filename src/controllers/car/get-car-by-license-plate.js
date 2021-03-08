export default function makeGetCarByLicensePlate({ listByLicensePlate }) {
  return async function getCarByLicensePlate(httpRequest) {
    const headers = {
      'Content-Type': 'application/json',
    };

    const { license } = httpRequest.params;

    try {
      const car = await listByLicensePlate({ license });
      return {
        headers,
        statusCode: 200,
        body: {
          message: 'List Car by license plate',
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
