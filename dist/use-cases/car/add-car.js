"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeAddCar;

var _entities = require("../../entities");

function makeAddCar({
  carDb,
  userDb
}) {
  return async function addCar(carInfo) {
    await validate(carInfo);
    const car = (0, _entities.makeCar)(carInfo);
    return carDb.insert(car);
  };

  async function validate(car) {
    const {
      owner,
      vin,
      licensePlate
    } = car; // Verificar que el usuario exista

    let existing = await userDb.findByUUID(owner);
    if (!existing) throw new Error('car/owner-uuid-not-found'); // Verificar que el VIN no este registrado

    existing = await carDb.findByVin(vin);
    if (existing.length > 0) throw new Error('car/vin-already-exists'); // // Verificar que el la matricula que se intenta agregar no exista

    existing = await carDb.findByLicensePlate(licensePlate);
    if (existing.length > 0) throw new Error('car/license-plate-already-exists');
  }
}