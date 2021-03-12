"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeListCities;

function makeListCities({
  cityDb
}) {
  return async function listCities({
    cityId
  } = {}) {
    if (cityId) {
      const city = await cityDb.findById(cityId);
      if (!city) throw new Error(`City with id ${cityId} not found`);
      return city;
    }

    const cities = await cityDb.findAll();
    return cities;
  };
}