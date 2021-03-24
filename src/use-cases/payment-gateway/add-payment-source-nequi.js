export default function makeAddPaymentSourceNequi({ paymentGateway }) {
  return async function addPaymentSourceNequi(sourceInfo) {
    return paymentGateway.insertSourceNequi(sourceInfo);
  };
}
