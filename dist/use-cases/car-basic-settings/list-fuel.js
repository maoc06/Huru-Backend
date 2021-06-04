"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeListFuel;

function makeListFuel({
  carBasicSettingsDb
}) {
  return function listFuel() {
    return carBasicSettingsDb.findAllFuel();
  };
}