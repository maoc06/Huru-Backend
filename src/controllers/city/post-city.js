export default function makePostCity({ addCity }) {
  return async function postCity(httpRequest) {
    const headers = {
      'Content-Type': 'application/json',
    };

    try {
      const { ...cityInfo } = httpRequest.body;
      const city = await addCity({ ...cityInfo });

      return {
        headers,
        statusCode: 201,
        body: {
          message: 'City successfully added',
          data: city,
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
