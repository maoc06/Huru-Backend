export default function makeRemoveCarImage({ carBasicSettingsDb }) {
  return async function removeCarImage(carImageId) {
    return carBasicSettingsDb.deleteCarImage(carImageId);
  };
}
