Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = makeListMaxTrip;

function makeListMaxTrip({ carBasicSettingsDb }) {
  return function listMaxTrip() {
    return carBasicSettingsDb.findAllMaxTripDurations();
  };
}
