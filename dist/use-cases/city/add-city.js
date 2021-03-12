"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeAddCity;

var _entities = require("../../entities");

function makeAddCity({
  cityDb
}) {
  return async function addCity(cityInfo) {
    const city = (0, _entities.makeCity)(cityInfo);
    return cityDb.insert({
      name: city.getCityName()
    });
  };
}