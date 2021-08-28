import { makePaymentNequi } from '../../entities';

export default function makeAddPaymentSourceNequi({ paymentGateway }) {
  return async function addPaymentSourceNequi(sourceInfo) {
    const nequi = makePaymentNequi(sourceInfo);
    return paymentGateway.insertSourceNequi(nequi);
  };
}
