export default function makePostPaymentSourceNequi({ addPaymentSourceNequi }) {
  return async function postPaymentSourceNequi(httpRequest) {
    const headers = {
      'Content-Type': 'application/json',
    };

    try {
      const { ...sourceInfo } = httpRequest.body;
      const source = await addPaymentSourceNequi({ ...sourceInfo });

      return {
        headers,
        statusCode: 201,
        body: {
          message: 'Payment source Nequi successfully added',
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
