import { paymentUser } from './models/payment';

export default function makePaymentUserDb({ client }) {
  const paymentUserModel = paymentUser({ client });

  function findById(paymentId) {
    return paymentUserModel.findByPk(paymentId);
  }

  function findByUser(uuid) {
    return paymentUserModel.findAll({
      where: { addedBy: uuid },
      order: [['id', 'DESC']],
    });
  }

  function findDefaultByUser(uuid) {
    return paymentUserModel.findAll({
      where: { addedBy: uuid, isDefault: true },
    });
  }

  async function updatePayment(paymentId, paymentData) {
    const res = await paymentUserModel.update(paymentData, {
      where: { id: paymentId },
      returning: true,
      plain: true,
    });
    return res[1].dataValues;
  }

  return Object.freeze({
    findById,
    findByUser,
    findDefaultByUser,
    updatePayment,
  });
}
