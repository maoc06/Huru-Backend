export default function makePostDisableDay({ addDisableDay }) {
  return async function postDisableDay(httpRequest) {
    const headers = {
      'Content-Type': 'application/json',
    };

    try {
      const disableDayInfo = httpRequest.body;
      const disableDay = await addDisableDay({ disableDayInfo });

      return {
        headers,
        statusCode: 201,
        body: {
          message: 'Disable day successfully added',
          data: disableDay,
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
