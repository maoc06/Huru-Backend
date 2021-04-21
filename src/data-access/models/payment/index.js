import client from '../../client';

import buildPaymentUserModel from './payment-user';
import buildTransactionModel from './transaction';

const paymentUser = buildPaymentUserModel(client);
const transaction = buildTransactionModel(client);

export {
  buildPaymentUserModel as paymentUser,
  buildTransactionModel as transaction,
};
