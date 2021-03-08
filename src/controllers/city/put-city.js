export default function makePutCity({ updateCity }) {
  return async function putCity(httpRequest) {
    const headers = {
      'Content-Type': 'application/json',
    };

    try {
      const { ...cityInfo } = httpRequest.body;
      const city = await updateCity({ ...cityInfo });
      return {
        headers,
        statusCode: 201,
        body: {
          message: 'City successfully updated',
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
