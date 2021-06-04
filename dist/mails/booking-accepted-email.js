"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeSendBookingAcceptedtMail;

var _mailer = require("../../config/mailer");

function makeSendBookingAcceptedtMail() {
  return async function sendBookingAcceptedtMail({
    emailToSend,
    carInfo,
    carImage,
    startDate,
    endDate,
    bookingNumber,
    owner,
    phone,
    typePayment,
    brandLogo,
    lastFour,
    nequiPhone,
    paid,
    paidOn
  } = {}) {
    _mailer.email.send({
      template: 'booking-accepted',
      message: {
        from: '"Huru 🚗" <hurubymaja@gmail.com>',
        to: emailToSend
      },
      locals: {
        carInfo,
        carImage,
        startDate,
        endDate,
        bookingNumber,
        owner,
        phone,
        typePayment,
        brandLogo,
        lastFour,
        nequiPhone,
        paid,
        paidOn
      }
    }).then(() => console.log('Booking accepted has been send to', emailToSend));
  };
}