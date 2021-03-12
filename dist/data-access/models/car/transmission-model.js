"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = buildTransmissionModel;

var _sequelize = require("sequelize");

function buildTransmissionModel({
  client
}) {
  const Transmission = client.define('Transmission', {
    transmissionId: {
      type: _sequelize.DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      field: 'transmission_id'
    },
    name: {
      type: _sequelize.DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'transmission',
    timestamps: false
  });

  Transmission.associate = models => {
    Transmission.hasMany(models.CarModel);
  };

  return Transmission;
}