export default function makeListOdometer({ carBasicSettingsDb }) {
  return function listOdometer() {
    return carBasicSettingsDb.findAllOdometerRange();
  };
}
