"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeListPaymentById;

function makeListPaymentById({
  paymentUserDb
}) {
  return async function listPaymentById({
    id
  } = {}) {
    if (!id) throw new Error(`Payment id is null`);
    const paymentMethod = await paymentUserDb.findById(id);
    return paymentMethod;
  };
}