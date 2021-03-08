export default function makeListTransmissions({ carBasicSettingsDb }) {
  return function listTransmissions() {
    return carBasicSettingsDb.findAllTransmissions();
  };
}
