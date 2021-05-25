export default function makeListFuel({ carBasicSettingsDb }) {
  return function listFuel() {
    return carBasicSettingsDb.findAllFuel();
  };
}
