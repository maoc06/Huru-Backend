import { paymentUserUseCases } from '../../use-cases';

import makeGetPaymentById from './get-payment-by-id';
import makeGetPaymentByUser from './get-payment-by-user';
import makeGetDefaultPaymentByUser from './get-default-payment-by-user';
import makePutDefaultPayment from './put-default-payment';

const {
  listPaymentById,
  listPaymentByUser,
  listDefaultPaymentByUser,
  updateDefaultPayment,
} = paymentUserUseCases;

const getPaymentById = makeGetPaymentById({ listPaymentById });
const getPaymentByUser = makeGetPaymentByUser({ listPaymentByUser });
const getDefaultPaymentByUser = makeGetDefaultPaymentByUser({
  listDefaultPaymentByUser,
});
const putDefaultPayment = makePutDefaultPayment({ updateDefaultPayment });

export default {
  getPaymentById,
  getPaymentByUser,
  getDefaultPaymentByUser,
  putDefaultPayment,
};
