import { paymentUseCases } from '../../use-cases';

import makePostPaymentSourceCard from './post-payment-sources-card';
import makePostPaymentSourceNequi from './post-payment-sources-nequi';
import makePostTransaction from './post-transaction';
import makePostTransactionEvents from './post-transaction-events';

const {
  addPaymentSourceCard,
  addPaymentSourceNequi,
  addTransaction,
  listenTransactionEvents,
} = paymentUseCases;

const postPaymentSourceCard = makePostPaymentSourceCard({
  addPaymentSourceCard,
});
const postPaymentSourceNequi = makePostPaymentSourceNequi({
  addPaymentSourceNequi,
});
const postTransaction = makePostTransaction({
  addTransaction,
});
const postTransactionEvents = makePostTransactionEvents({
  listenTransactionEvents,
});

export default {
  postPaymentSourceCard,
  postPaymentSourceNequi,
  postTransaction,
  postTransactionEvents,
};
