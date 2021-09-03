Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = makeListByCar;

function makeListByCar({ disableDayDb, carDb }) {
  return async function listByCar({ carId } = {}) {
    if (!carId) throw new Error('Car id null');
    const existing = await carDb.findByIdSimple(carId);
    if (!existing) throw new Error('Car not found');
    const days = await disableDayDb.findByCar(carId);
    return days;
  };
}
