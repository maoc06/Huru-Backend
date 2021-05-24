export default function makeDeleteDisableDay({ removeDisableDay }) {
  return async function deleteDisableDay(httpRequest) {
    const headers = {
      'Content-Type': 'application/json',
    };

    try {
      const { carId, disableDay } = httpRequest.params;
      const removed = await removeDisableDay({ carId, disableDay });

      return {
        headers,
        statusCode: 201,
        body: {
          message: 'Disable day successfully removed',
          data: removed,
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
