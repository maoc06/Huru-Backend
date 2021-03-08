export default function makeListFeaturesOpts({ carBasicSettingsDb }) {
  return function listFeaturesOpts() {
    return carBasicSettingsDb.findAllFeaturesOpts();
  };
}
