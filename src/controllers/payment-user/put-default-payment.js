export default function makePutDefaultPayment({ updateDefaultPayment }) {
  return async function putDefaultPayment(httpRequest) {
    const headers = {
      'Content-Type': 'application/json',
    };

    const { ...paymentData } = httpRequest.body;

    try {
      const paymentMethod = await updateDefaultPayment({ paymentData });
      return {
        headers,
        statusCode: 200,
        body: {
          message: 'Updated default payment sucessfully',
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
