"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeListOdometer;

function makeListOdometer({
  carBasicSettingsDb
}) {
  return function listOdometer() {
    return carBasicSettingsDb.findAllOdometerRange();
  };
}