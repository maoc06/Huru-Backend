export default function makeListMaxTrip({ carBasicSettingsDb }) {
  return function listMaxTrip() {
    return carBasicSettingsDb.findAllMaxTripDurations();
  };
}
