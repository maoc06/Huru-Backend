export default function makeAddTransaction({ paymentGateway }) {
  return async function addTransaction(paymentInfo) {
    return paymentGateway.makeTransaction(paymentInfo);
  };
}
