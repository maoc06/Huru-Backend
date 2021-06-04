"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeSendPaymentDeclinedMail;

var _mailer = require("../../config/mailer");

function makeSendPaymentDeclinedMail() {
  return async function sendPaymentDeclinedMail({
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
    nequiPhone
  } = {}) {
    _mailer.email.send({
      template: 'payment-declined',
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
        nequiPhone
      }
    }).then(() => console.log('Payment declined has been send to', emailToSend));
  };
}