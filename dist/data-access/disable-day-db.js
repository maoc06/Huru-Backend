"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeDisableDayDb;

var _models = require("./models");

const {
  DisableDay
} = _models.OtherModels;

function makeDisableDayDb() {
  function findAll() {
    return DisableDay.findAll();
  }

  function findById(disableDayId) {
    return DisableDay.findByPk(disableDayId);
  }

  function findByCar(carId) {
    return DisableDay.findAll({
      where: {
        carId
      }
    });
  }

  function insert({ ...disableDayInfo
  }) {
    return DisableDay.create({ ...disableDayInfo
    });
  }

  function deleteDay({
    carId,
    disableDay
  }) {
    return DisableDay.destroy({
      where: {
        carId,
        disableDay
      }
    });
  }

  return Object.freeze({
    findAll,
    findById,
    findByCar,
    insert,
    deleteDay
  });
}