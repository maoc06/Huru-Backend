Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = makeListModels;

function makeListModels({ carBasicSettingsDb }) {
  return function listModels() {
    return carBasicSettingsDb.findAllModels();
  };
}
