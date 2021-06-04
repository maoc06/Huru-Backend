"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeSendBookingRequestMail;

var _mailer = require("../../config/mailer");

function makeSendBookingRequestMail() {
  return async function sendBookingRequestMail({
    emailToSend,
    carInfo,
    carImage,
    startDate,
    endDate,
    applicant,
    url
  } = {}) {
    _mailer.email.send({
      template: 'booking-request',
      message: {
        from: '"Huru 🚗" <hurubymaja@gmail.com>',
        to: emailToSend
      },
      locals: {
        carInfo,
        carImage,
        startDate,
        endDate,
        applicant,
        url
      }
    }).then(() => console.log('Booking request has been send to', emailToSend));
  };
}