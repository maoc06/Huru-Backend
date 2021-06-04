"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = buildMaxTripDurationModel;

var _sequelize = require("sequelize");

function buildMaxTripDurationModel({
  client
}) {
  return client.define('MaxTripDuration', {
    id: {
      type: _sequelize.DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      field: 'max_trip_duration_id'
    },
    name: {
      type: _sequelize.DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    tableName: 'max_trip_duration',
    timestamps: false
  });
}