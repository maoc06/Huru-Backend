"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = buildFeatureModel;

var _sequelize = require("sequelize");

function buildFeatureModel({
  client
}) {
  return client.define('feature', {
    featureId: {
      type: _sequelize.DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      field: 'feature_id'
    },
    name: {
      type: _sequelize.DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    timestamps: false,
    tableName: 'feature',
    freezeTableName: true
  });
}