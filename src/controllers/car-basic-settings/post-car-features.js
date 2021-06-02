export default function makePostCarFeatures({ addCarFeatures }) {
  return async function postCarFeatures(httpRequest) {
    const headers = {
      'Content-Type': 'application/json',
    };

    try {
      const selectedFeatures = httpRequest.body;

      const carFeatures = await addCarFeatures(selectedFeatures);

      return {
        headers,
        statusCode: 201,
        body: {
          message: 'Car features successfully added',
          data: carFeatures,
        },
      };
    } catch (e) {
      console.log(e);
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
