export default function makeGetPaymentByUser({ listPaymentByUser }) {
  return async function getPaymentByUser(httpRequest) {
    const headers = {
      'Content-Type': 'application/json',
    };

    const uuid = httpRequest.params.id;

    try {
      const paymentMethods = await listPaymentByUser({ uuid });
      return {
        headers,
        statusCode: 200,
        body: {
          message: 'List payment methods',
          data: paymentMethods,
        },
      };
    } catch (e) {
      console.log('uid', e);
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
