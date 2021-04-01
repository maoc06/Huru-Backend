import { paymentUserUseCases } from '../../use-cases';

import makeGetPaymentByUser from './get-payment-by-user';
import makeGetDefaultPaymentByUser from './get-default-payment-by-user';

const { listPaymentByUser, listDefaultPaymentByUser } = paymentUserUseCases;

const getPaymentByUser = makeGetPaymentByUser({ listPaymentByUser });
const getDefaultPaymentByUser = makeGetDefaultPaymentByUser({
  listDefaultPaymentByUser,
});

export default {
  getPaymentByUser,
  getDefaultPaymentByUser,
};
