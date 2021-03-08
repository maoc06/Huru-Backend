export default function makeListAdvanceNotice({ carBasicSettingsDb }) {
  return function listAdvanceNotice() {
    return carBasicSettingsDb.findAllAdvanceNotice();
  };
}
