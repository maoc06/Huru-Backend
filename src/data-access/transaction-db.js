import { transaction } from './models/payment';

export default function makeTransactionDb({ client }) {
  const transactionModel = transaction({ client });

  function findById(transactionId) {
    return transactionModel.findByPk(transactionId);
  }

  async function updateTrackingIdentifiers(
    transactionId,
    transactionNumber,
    reference
  ) {
    const res = await transactionModel.update(
      { transactionNumber, reference },
      { where: { transactionId }, returning: true, plain: true }
    );
    return res[1].dataValues;
  }

  async function updateStatus(transactionNumber, reference, status) {
    const res = await transactionModel.update(
      { status },
      { where: { transactionNumber, reference }, returning: true, plain: true }
    );
    return res[1].dataValues;
  }

  async function updateRejectBooking(transactionId) {
    const res = await transactionModel.update(
      { transactionNumber: '---', reference: '---', status: 'DECLINED' },
      { where: { transactionId }, returning: true, plain: true }
    );
    return res[1].dataValues;
  }

  return Object.freeze({
    findById,
    updateTrackingIdentifiers,
    updateStatus,
    updateRejectBooking,
  });
}
