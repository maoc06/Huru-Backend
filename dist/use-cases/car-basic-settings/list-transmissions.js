Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = makeListTransmissions;

function makeListTransmissions({ carBasicSettingsDb }) {
  return function listTransmissions() {
    return carBasicSettingsDb.findAllTransmissions();
  };
}
