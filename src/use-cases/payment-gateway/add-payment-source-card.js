import { makePaymentCard } from '../../entities';

export default function makeAddPaymentSourceCard({ paymentGateway }) {
  return async function addPaymentSourceCard(sourceInfo) {
    const card = makePaymentCard(sourceInfo);

    return paymentGateway.insertSourceCard(card);
  };
}
