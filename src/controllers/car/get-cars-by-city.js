export default function makeGetCarsByCity({ listCarsByCity }) {
  return async function getCarsByCity(httpRequest) {
    const headers = {
      'Content-Type': 'application/json',
    };

    const { city, checkIn, checkOut } = httpRequest.params;

    console.log('city', city);
    console.log('checkIn', checkIn);
    console.log('checkOut', checkOut);

    try {
      const cars = await listCarsByCity({ city, checkIn, checkOut });
      return {
        headers,
        statusCode: 200,
        body: {
          message: 'List Cars by city',
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
