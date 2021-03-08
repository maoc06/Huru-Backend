export default function makePostCar({ addCar }) {
  return async function postCar(httpRequest) {
    const headers = {
      'Content-Type': 'application/json',
    };

    try {
      const { ...carInfo } = httpRequest.body;
      const car = await addCar({ ...carInfo });

      return {
        headers,
        statusCode: 201,
        body: {
          message: 'Car successfully added',
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
