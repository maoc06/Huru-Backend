export default function makeListPaymentByUser({ paymentUserDb, userDb }) {
  return async function listPaymentByUser({ uuid } = {}) {
    if (!uuid) throw new Error(`User id is null`);

    const user = await userDb.findByUUID(uuid);
    if (!user) throw new Error(`User with id ${uuid} does not exist`);

    const paymentMethods = await paymentUserDb.findByUser(uuid);
    return paymentMethods;
  };
}
