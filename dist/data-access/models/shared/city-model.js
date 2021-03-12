"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = buildCityModel;

var _sequelize = require("sequelize");

function buildCityModel({
  client
}) {
  const City = client.define('City', {
    cityId: {
      type: _sequelize.DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      field: 'city_id'
    },
    name: {
      type: _sequelize.DataTypes.STRING(150),
      allowNull: false
    }
  }, {
    tableName: 'city',
    timestamps: false
  });

  City.associate = models => {
    City.hasMany(models.Car);
  };

  return City;
}