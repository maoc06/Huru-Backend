"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makePaymentUserDb;

var _payment = require("./models/payment");

const ENABLED_STATUS_ID = 1;

function makePaymentUserDb({
  client
}) {
  const paymentUserModel = (0, _payment.paymentUser)({
    client
  });

  function findById(paymentId) {
    return paymentUserModel.findByPk(paymentId);
  }

  function findByUser(uuid) {
    return paymentUserModel.findAll({
      where: {
        addedBy: uuid,
        status: ENABLED_STATUS_ID
      },
      order: [['id', 'DESC']]
    });
  }

  function findDefaultByUser(uuid) {
    return paymentUserModel.findAll({
      where: {
        addedBy: uuid,
        isDefault: true
      }
    });
  }

  async function updatePayment(paymentId, paymentData) {
    const res = await paymentUserModel.update(paymentData, {
      where: {
        id: paymentId
      },
      returning: true,
      plain: true
    });
    return res[1].dataValues;
  }

  return Object.freeze({
    findById,
    findByUser,
    findDefaultByUser,
    updatePayment
  });
}