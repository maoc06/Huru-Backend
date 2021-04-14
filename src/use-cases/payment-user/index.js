import makeListPaymentById from './list-payment-by-id';
import makeListPaymentByUser from './list-payment-by-user';
import makeListDefaultPaymentByUser from './list-default-payment-by-user';
import makeUpdateDefaultPayment from './update-default-payment';
import makeUpdateDisablePayment from './update-disable-payment';

import { paymentUserDb, userDb } from '../../data-access';

const listPaymentById = makeListPaymentById({ paymentUserDb });
const listPaymentByUser = makeListPaymentByUser({ paymentUserDb, userDb });
const listDefaultPaymentByUser = makeListDefaultPaymentByUser({
  paymentUserDb,
  userDb,
});
const updateDefaultPayment = makeUpdateDefaultPayment({ paymentUserDb });
const updateDisablePayment = makeUpdateDisablePayment({ paymentUserDb });

export default {
  listPaymentById,
  listPaymentByUser,
  listDefaultPaymentByUser,
  updateDefaultPayment,
  updateDisablePayment,
};
