"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = buildFuelModel;

var _sequelize = require("sequelize");

function buildFuelModel({
  client
}) {
  return client.define('fuel', {
    fuelId: {
      type: _sequelize.DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      field: 'fuel_id'
    },
    name: {
      type: _sequelize.DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    timestamps: false,
    freezeTableName: true
  });
}