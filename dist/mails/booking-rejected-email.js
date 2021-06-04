"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeSendBookingRejectedMail;

var _mailer = require("../../config/mailer");

function makeSendBookingRejectedMail() {
  return async function sendBookingRejectedMail({
    emailToSend,
    carInfo,
    carImage,
    startDate,
    endDate
  } = {}) {
    _mailer.email.send({
      template: 'booking-rejected',
      message: {
        from: '"Huru 🚗" <hurubymaja@gmail.com>',
        to: emailToSend
      },
      locals: {
        carInfo,
        carImage,
        startDate,
        endDate
      }
    }).then(() => console.log('Booking rejected has been send to', emailToSend));
  };
}