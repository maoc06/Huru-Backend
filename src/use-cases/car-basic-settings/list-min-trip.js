export default function makeListMinTrip({ carBasicSettingsDb }) {
  return function listMinTrip() {
    return carBasicSettingsDb.findAllMinTripDurations();
  };
}
