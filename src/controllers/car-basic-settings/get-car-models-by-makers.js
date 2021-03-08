export default function makeGetCarModelsByMaker({ listCarModelsByMaker }) {
  return async function getCarModelsByMaker(httpRequest) {
    const headers = {
      'Content-Type': 'application/json',
    };

    const { makerId } = httpRequest.params;

    try {
      const models = await listCarModelsByMaker({ makerId });
      return {
        headers,
        statusCode: 200,
        body: {
          message: 'List of car models by makers',
          data: models,
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
