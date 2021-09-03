Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = makeUpdateBookingTerms;

function makeUpdateBookingTerms({ carDb }) {
  return async function updateBookingTerms({ carData } = {}) {
    const { carId } = carData; // const dataUpdate = { carId, description };

    const existing = await carDb.findById(carId);

    if (!existing) {
      throw new RangeError(`Car with id ${carId} not found`);
    }

    return carDb.update(carData);
  };
}
