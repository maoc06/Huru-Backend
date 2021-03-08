export default function makePostCarImage({ addCarImage }) {
  return async function postCarImage(httpRequest) {
    const headers = {
      'Content-Type': 'application/json',
    };

    try {
      const imageInfo = httpRequest.body;

      const carImage = await addCarImage(imageInfo);

      return {
        headers,
        statusCode: 201,
        body: {
          message: 'Car image successfully added',
          data: carImage,
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
