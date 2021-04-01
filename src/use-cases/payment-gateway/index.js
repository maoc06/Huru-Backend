import makeAddPaymentSourceCard from './add-payment-source-card';
import makeAddPaymentSourceNequi from './add-payment-source-nequi';
import makeAddTransaction from './add-transaction';
import makeListenTransactionEvents from './listen-transaction-events';

import mailer from '../../mails';

import {
  paymentGateway,
  transactionDb,
  bookingDb,
  userDb,
  carDb,
  paymentUserDb,
} from '../../data-access';

const { sendReceiptMail, sendPaymentDeclinedMail } = mailer;

const addPaymentSourceCard = makeAddPaymentSourceCard({ paymentGateway });
const addPaymentSourceNequi = makeAddPaymentSourceNequi({ paymentGateway });
const addTransaction = makeAddTransaction({ paymentGateway });
const listenTransactionEvents = makeListenTransactionEvents({
  transactionDb,
  bookingDb,
  userDb,
  carDb,
  paymentUserDb,
  sendReceiptMail,
  sendPaymentDeclinedMail,
});

export default {
  addPaymentSourceCard,
  addPaymentSourceNequi,
  addTransaction,
  listenTransactionEvents,
};
