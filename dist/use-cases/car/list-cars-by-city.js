"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeListCarsByCity;

function makeListCarsByCity({
  carDb
}) {
  return async function listCarsByCity({
    city,
    checkIn,
    checkOut
  } = {}) {
    if (!city) throw new Error('city null');
    const existing = await carDb.findByAvailability(city, checkIn, checkOut);
    if (existing.length === 0) return {};
    return existing;
  };
}