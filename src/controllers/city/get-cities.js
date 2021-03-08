export default function makeGetCities({ listCities }) {
  return async function getCities(httpRequest) {
    const headers = {
      'Content-Type': 'application/json',
    };

    const cityId = httpRequest.params.id;

    try {
      const cities = await listCities({ cityId });
      return {
        headers,
        statusCode: 200,
        body: {
          message: cityId ? 'Retrieve a city' : 'List Cities',
          data: cities,
        },
      };
    } catch (e) {
      console.error(e);
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
