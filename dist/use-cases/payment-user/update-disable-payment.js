"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeUpdateDisablePayment;

function makeUpdateDisablePayment({
  paymentUserDb
}) {
  return async function updateDisablePayment({
    paymentData
  } = {}) {
    const DISABLED_STATUS_ID = 2;
    const {
      id
    } = paymentData;
    const existing = await paymentUserDb.findById(id);

    if (!existing) {
      throw new Error('The payment method you are trying to disable does not exist');
    }

    const payment = {
      status: DISABLED_STATUS_ID
    };
    const paymentMethod = await paymentUserDb.updatePayment(id, payment);
    return paymentMethod;
  };
}