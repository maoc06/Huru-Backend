"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeSendReceiptMail;

var _mailer = require("../../config/mailer");

function makeSendReceiptMail() {
  return async function sendReceiptMail({
    emailToSend,
    carInfo,
    carImage,
    startDate,
    endDate,
    reference,
    pricePerDay,
    countDays,
    serviceFee,
    typePayment,
    brandLogo,
    lastFour,
    nequiPhone,
    paidOn
  } = {}) {
    _mailer.email.send({
      template: 'receipt',
      message: {
        from: '"Huru 🚗" <hurubymaja@gmail.com>',
        to: emailToSend
      },
      locals: {
        carInfo,
        carImage,
        startDate,
        endDate,
        reference,
        pricePerDay,
        countDays,
        serviceFee,
        typePayment,
        brandLogo,
        lastFour,
        nequiPhone,
        paidOn
      }
    }).then(() => console.log('Receipt has been send to', emailToSend));
  };
}