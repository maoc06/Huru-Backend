Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = makeUpdateDisable;
const CAR_DISABLED_ID = 2;

function makeUpdateDisable({ carDb }) {
  return async function updateDisable({ carData } = {}) {
    const { carId } = carData;
    const dataUpdate = {
      carId,
      status: CAR_DISABLED_ID,
    };
    const existing = await carDb.findById(carId);

    if (!existing) {
      throw new RangeError(`Car with id ${carId} not found`);
    }

    return carDb.update(dataUpdate);
  };
}
