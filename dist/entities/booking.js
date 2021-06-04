"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = buildMakeBooking;

function buildMakeBooking() {
  return function makeBooking({ ...entity
  }) {
    const {
      paymentId,
      bookingCar,
      bookingBy,
      checkin,
      checkout,
      pricePerDay,
      siteFees
    } = { ...entity
    };
    if (!paymentId) throw new Error('Booking must have a payment assigned');
    if (!bookingCar) throw new Error('Booking must have a car assigned');
    if (!bookingBy) throw new Error('Booking must be assigned to a user');
    if (!checkin) throw new Error('Booking must have a start date assigned');
    if (!checkout) throw new Error('Booking must have a end date assigned');
    if (!pricePerDay) throw new Error('Booking must be assigned a price per day');
    if (!siteFees) throw new Error('Booking must be assigned a site fees');
    const booking = Object.freeze({ ...entity
    });
    return booking;
  };
}