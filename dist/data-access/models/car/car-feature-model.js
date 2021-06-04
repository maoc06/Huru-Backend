"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = buildCarFeatureModel;

var _sequelize = require("sequelize");

function buildCarFeatureModel({
  client
}) {
  return client.define('CarFeature', {
    carFeatureId: {
      type: _sequelize.DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      field: 'car_feature_id'
    },
    carId: {
      type: _sequelize.DataTypes.INTEGER,
      allowNull: false,
      field: 'car_id'
    },
    featureId: {
      type: _sequelize.DataTypes.INTEGER,
      allowNull: false,
      field: 'feature_id'
    }
  }, {
    tableName: 'car_feature',
    timestamps: false
  });
}