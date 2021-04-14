export default function makePatchDisablePayment({ updateDisablePayment }) {
  return async function patchDisablePayment(httpRequest) {
    const headers = {
      'Content-Type': 'application/json',
    };

    const { ...paymentData } = httpRequest.body;

    try {
      const paymentMethod = await updateDisablePayment({ paymentData });
      return {
        headers,
        statusCode: 200,
        body: {
          message: 'Updated disable payment sucessfully',
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
