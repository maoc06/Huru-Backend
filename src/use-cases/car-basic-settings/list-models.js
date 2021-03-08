export default function makeListModels({ carBasicSettingsDb }) {
  return function listModels() {
    return carBasicSettingsDb.findAllModels();
  };
}
