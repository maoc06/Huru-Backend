import { paymentUser } from './models/payment';

export default function makePaymentUserDb({ client }) {
  const paymentUserModel = paymentUser({ client });

  function findById(paymentId) {
    return paymentUserModel.findByPk(paymentId);
  }

  function findByUser(uuid) {
    return paymentUserModel.findAll({ where: { addedBy: uuid } });
  }

  function findDefaultByUser(uuid) {
    return paymentUserModel.findAll({
      where: { addedBy: uuid, isDefault: true },
    });
  }

  return Object.freeze({
    findById,
    findByUser,
    findDefaultByUser,
  });
}
