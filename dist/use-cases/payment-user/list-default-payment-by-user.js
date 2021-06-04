"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeListDefaultPaymentByUser;

function makeListDefaultPaymentByUser({
  paymentUserDb,
  userDb
}) {
  return async function listDefaultPaymentByUser({
    uuid
  } = {}) {
    if (!uuid) throw new Error(`User id is null`);
    const user = await userDb.findByUUID(uuid);
    if (!user) throw new Error(`User with id ${uuid} does not exist`);
    const paymentMethod = await paymentUserDb.findDefaultByUser(uuid);
    return paymentMethod;
  };
}