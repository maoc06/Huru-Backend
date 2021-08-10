export default function makePutCarData({ updateData }) {
  return async function putCarData(httpRequest) {
    const headers = {
      'Content-Type': 'application/json',
    };

    try {
      const data = httpRequest.body;
      await updateData({ ...data });

      return {
        headers,
        statusCode: 201,
        body: {
          message: 'Car successfully update',
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
