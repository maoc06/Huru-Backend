Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = makeListCar;

function makeListCar({ carDb }) {
  return async function listCar({ carId } = {}) {
    if (!carId) throw new Error('Car ID null');
    const existing = await carDb.findById(carId);
    if (!existing) throw new Error(`car with id ${carId} does not exist`);
    return existing;
  };
}
