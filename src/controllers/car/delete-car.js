export default function makeDeleteCar({ destroyCar }) {
  return async function deleteCar(httpRequest) {
    const headers = {
      'Content-Type': 'application/json',
    };

    const { carId } = httpRequest.params;

    try {
      await destroyCar({ carId });
      return {
        headers,
        statusCode: 200,
        body: {
          message: 'Car successfully deleted',
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
