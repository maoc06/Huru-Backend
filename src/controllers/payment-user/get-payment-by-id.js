export default function makeGetPaymentById({ listPaymentById }) {
  return async function getPaymentById(httpRequest) {
    const headers = {
      'Content-Type': 'application/json',
    };

    const { id } = httpRequest.params;

    console.log('ID', id);

    try {
      const paymentMethod = await listPaymentById({ id });
      return {
        headers,
        statusCode: 200,
        body: {
          message: 'Retrieve payment method',
          data: paymentMethod,
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
