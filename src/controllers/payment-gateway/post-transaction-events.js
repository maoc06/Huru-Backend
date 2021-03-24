export default function makePostTransactionEvents({ listenTransactionEvents }) {
  return async function postTransactionEvents(httpRequest) {
    const headers = {
      'Content-Type': 'application/json',
    };

    try {
      const { ...eventInfo } = httpRequest.body;
      const event = await listenTransactionEvents({ ...eventInfo });

      return {
        headers,
        statusCode: 200,
        body: {
          data: event,
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
