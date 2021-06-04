"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeRemoveDisableDay;

var _luxon = require("luxon");

var _entities = require("../../entities");

function makeRemoveDisableDay({
  disableDayDb
}) {
  return async function removeDisableDay(disableDayInfo) {
    const data = (0, _entities.makeDisableDay)(disableDayInfo);
    const dateSplitted = data.disableDay.split('-');
    const year = parseInt(dateSplitted[0], 10);
    const month = parseInt(dateSplitted[1], 10);
    const day = parseInt(dateSplitted[2], 10);

    const date = _luxon.DateTime.utc(year, month, day).toISODate();

    return disableDayDb.deleteDay({
      carId: data.carId,
      disableDay: date
    });
  };
}