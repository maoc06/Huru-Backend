Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = makeListFeaturesOpts;

function makeListFeaturesOpts({ carBasicSettingsDb }) {
  return function listFeaturesOpts() {
    return carBasicSettingsDb.findAllFeaturesOpts();
  };
}
