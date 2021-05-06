export default function makeGetFeaturesByCar({ listFeaturesByCar }) {
  return async function getFeaturesByCar(httpRequest) {
    const headers = {
      'Content-Type': 'application/json',
    };

    const { carId } = httpRequest.params;

    try {
      const features = await listFeaturesByCar({ carId });
      return {
        headers,
        statusCode: 200,
        body: {
          message: 'List features by car',
          data: features,
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
