"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = buildMinTripDurationModel;

var _sequelize = require("sequelize");

function buildMinTripDurationModel({
  client
}) {
  return client.define('MinTripDuration', {
    id: {
      type: _sequelize.DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      field: 'min_trip_duration_id'
    },
    name: {
      type: _sequelize.DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    tableName: 'min_trip_duration',
    timestamps: false
  });
}