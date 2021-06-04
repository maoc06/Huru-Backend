"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = buildCarModelModel;

var _sequelize = require("sequelize");

function buildCarModelModel({
  client
}) {
  return client.define('model', {
    modelId: {
      type: _sequelize.DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      field: 'model_id'
    },
    makerId: {
      type: _sequelize.DataTypes.INTEGER,
      allowNull: false,
      field: 'maker_id'
    },
    name: {
      type: _sequelize.DataTypes.STRING(150),
      allowNull: false,
      field: 'model'
    },
    numOfSeats: {
      type: _sequelize.DataTypes.INTEGER,
      allowNull: false,
      field: 'number_of_seats'
    },
    transmissionId: {
      type: _sequelize.DataTypes.INTEGER,
      allowNull: false,
      field: 'transmission_id'
    }
  }, {
    timestamps: false,
    freezeTableName: true
  });
}