"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeListMinTrip;

function makeListMinTrip({
  carBasicSettingsDb
}) {
  return function listMinTrip() {
    return carBasicSettingsDb.findAllMinTripDurations();
  };
}