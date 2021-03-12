"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = buildMakerModel;

var _sequelize = require("sequelize");

function buildMakerModel({
  client
}) {
  const Maker = client.define('Maker', {
    makerId: {
      type: _sequelize.DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      field: 'maker_id'
    },
    name: {
      type: _sequelize.DataTypes.STRING(75),
      allowNull: false
    }
  }, {
    tableName: 'maker',
    timestamps: false
  });

  Maker.associate = models => {
    Maker.hasMany(models.Car);
    Maker.hasMany(models.CarModel);
  };

  return Maker;
}