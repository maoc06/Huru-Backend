export default function makeListCarCategories({ carBasicSettingsDb }) {
  return function listCarCategories() {
    return carBasicSettingsDb.findAllCarCategories();
  };
}
