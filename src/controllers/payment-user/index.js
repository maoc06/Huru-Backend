import { paymentUserUseCases } from '../../use-cases';

import makeGetPaymentById from './get-payment-by-id';
import makeGetPaymentByUser from './get-payment-by-user';
import makeGetDefaultPaymentByUser from './get-default-payment-by-user';

const {
  listPaymentById,
  listPaymentByUser,
  listDefaultPaymentByUser,
} = paymentUserUseCases;

const getPaymentById = makeGetPaymentById({ listPaymentById });
const getPaymentByUser = makeGetPaymentByUser({ listPaymentByUser });
const getDefaultPaymentByUser = makeGetDefaultPaymentByUser({
  listDefaultPaymentByUser,
});

export default {
  getPaymentById,
  getPaymentByUser,
  getDefaultPaymentByUser,
};
