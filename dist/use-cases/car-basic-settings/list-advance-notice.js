"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeListAdvanceNotice;

function makeListAdvanceNotice({
  carBasicSettingsDb
}) {
  return function listAdvanceNotice() {
    return carBasicSettingsDb.findAllAdvanceNotice();
  };
}