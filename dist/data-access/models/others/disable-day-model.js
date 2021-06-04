"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = buildDisableDayModel;

var _sequelize = require("sequelize");

function buildDisableDayModel({
  client
}) {
  return client.define('DisableDay', {
    disableDayId: {
      type: _sequelize.DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: true,
      field: 'disable_day_id'
    },
    disableDay: {
      type: _sequelize.DataTypes.DATE,
      allowNull: false,
      field: 'disable_day'
    },
    carId: {
      type: _sequelize.DataTypes.INTEGER,
      allowNull: false,
      field: 'car_id'
    }
  }, {
    tableName: 'disable_day',
    timestamps: false,
    freezeTableName: true
  });
}