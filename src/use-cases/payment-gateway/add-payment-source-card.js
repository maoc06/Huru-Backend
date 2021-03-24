export default function makeAddPaymentSourceCard({ paymentGateway }) {
  return async function addPaymentSourceCard(sourceInfo) {
    return paymentGateway.insertSourceCard(sourceInfo);
  };
}
