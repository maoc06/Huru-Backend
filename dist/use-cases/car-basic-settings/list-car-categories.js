Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = makeListCarCategories;

function makeListCarCategories({ carBasicSettingsDb }) {
  return function listCarCategories() {
    return carBasicSettingsDb.findAllCarCategories();
  };
}
