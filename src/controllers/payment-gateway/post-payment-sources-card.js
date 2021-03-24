export default function makePostPaymentSourceCard({ addPaymentSourceCard }) {
  return async function postPaymentSourceCard(httpRequest) {
    const headers = {
      'Content-Type': 'application/json',
    };

    try {
      const { ...sourceInfo } = httpRequest.body;
      const source = await addPaymentSourceCard({ ...sourceInfo });

      return {
        headers,
        statusCode: 201,
        body: {
          message: 'Payment source Card successfully added',
          data: source,
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
