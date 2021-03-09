export default function makeUpdateOwnerCarImage({ carBasicSettingsDb }) {
  return function updateOwnerCarImage(arrImages) {
    return carBasicSettingsDb.setOwnerCarImage(arrImages);
  };
}
