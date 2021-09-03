Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = makeListByVin;

function makeListByVin({ carDb }) {
  return async function listByVin({ vin } = {}) {
    if (!vin) throw new Error('vin null');
    const existing = await carDb.findByVin(vin);
    if (existing.length === 0) return {}; // throw new Error(`car with vin ${vin} does not exist`);

    return existing;
  };
}
