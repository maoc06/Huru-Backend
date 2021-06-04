"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeCountCompletedTripsByCar;

function makeCountCompletedTripsByCar({
  bookingDb,
  carDb
}) {
  return async function countCompletedTripsByCar({
    carId
  } = {}) {
    if (!carId) throw new Error(`Car id null`);
    const existing = await carDb.findById(carId);
    if (!existing) throw new RangeError(`Car with id ${carId} not found`);
    const count = await bookingDb.countCompletedTripsByCar(carId);
    return count;
  };
}