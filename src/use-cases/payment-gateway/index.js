import makeAddPaymentSourceCard from './add-payment-source-card';
import makeAddPaymentSourceNequi from './add-payment-source-nequi';
import makeAddTransaction from './add-transaction';
import makeListenTransactionEvents from './listen-transaction-events';

import { paymentGateway } from '../../data-access';

const addPaymentSourceCard = makeAddPaymentSourceCard({ paymentGateway });
const addPaymentSourceNequi = makeAddPaymentSourceNequi({ paymentGateway });
const addTransaction = makeAddTransaction({ paymentGateway });
const listenTransactionEvents = makeListenTransactionEvents();

export default {
  addPaymentSourceCard,
  addPaymentSourceNequi,
  addTransaction,
  listenTransactionEvents,
};
