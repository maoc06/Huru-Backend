import makeListPaymentByUser from './list-payment-by-user';
import makeListDefaultPaymentByUser from './list-default-payment-by-user';

import { paymentUserDb, userDb } from '../../data-access';

const listPaymentByUser = makeListPaymentByUser({ paymentUserDb, userDb });
const listDefaultPaymentByUser = makeListDefaultPaymentByUser({
  paymentUserDb,
  userDb,
});

export default {
  listPaymentByUser,
  listDefaultPaymentByUser,
};
