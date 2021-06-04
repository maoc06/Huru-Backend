"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeUpdateDefaultPayment;

function makeUpdateDefaultPayment({
  paymentUserDb
}) {
  return async function updateDefaultPayment({
    paymentData
  } = {}) {
    const oldDefaultId = paymentData.id;
    const newDefaultId = paymentData.newDefault;
    let existing = await paymentUserDb.findById(oldDefaultId);
    if (!existing) throw new Error('The payment method that was supposed to be assigned by default does not exist');
    existing = await paymentUserDb.findById(newDefaultId);
    if (!existing) throw new Error('The payment method that was supposed to be assigned as a new default does not exist');
    const oldPayment = {
      id: oldDefaultId,
      isDefault: false
    };
    const newPayment = {
      id: newDefaultId,
      isDefault: true
    };
    await paymentUserDb.updatePayment(oldDefaultId, oldPayment);
    const paymentMethod = await paymentUserDb.updatePayment(newDefaultId, newPayment);
    return paymentMethod;
  };
}