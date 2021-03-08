export default function makeGetFeaturesOpts({ listFeaturesOpts }) {
  return async function getFeaturesOpts() {
    const headers = {
      'Content-Type': 'application/json',
    };

    try {
      const features = await listFeaturesOpts();
      return {
        headers,
        statusCode: 200,
        body: {
          message: 'List of features options',
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
