Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = makeRemoveCarImage;

function makeRemoveCarImage({ carBasicSettingsDb }) {
  return async function removeCarImage(carImageId) {
    return carBasicSettingsDb.deleteCarImage(carImageId);
  };
}
