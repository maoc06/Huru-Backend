"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeAddCarFeatures;

function makeAddCarFeatures({
  carBasicSettingsDb,
  carDb
}) {
  return async function addCarFeatures(data) {
    const {
      carId,
      selected
    } = data;
    await validate(carId);
    return carBasicSettingsDb.insertCarFeatures(selected);
  };

  async function validate(carId) {
    // Verificar que el Carro exista
    const existing = await carDb.findById(carId);
    if (!existing) throw new Error(`car-not-found`);
  }
}