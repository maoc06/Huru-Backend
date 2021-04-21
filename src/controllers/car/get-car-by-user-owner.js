export default function makeGetCarByUserOwner({ listByUserOwner }) {
  return async function getCarByUserOwner(httpRequest) {
    const headers = {
      'Content-Type': 'application/json',
    };

    const ownerUUID = httpRequest.params.id;

    try {
      const cars = await listByUserOwner({ ownerUUID });
      return {
        headers,
        statusCode: 200,
        body: {
          message: 'List Car(s) by user owner',
          data: cars,
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
