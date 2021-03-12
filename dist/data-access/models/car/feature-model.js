"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = buildFeatureModel;

var _sequelize = require("sequelize");

function buildFeatureModel({
  client
}) {
  const Feature = client.define('Feature', {
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
    },
    icon: {
      type: _sequelize.DataTypes.STRING(255),
      allowNull: false,
      field: 'icon_image'
    }
  }, {
    tableName: 'feature',
    timestamps: false
  });

  Feature.associate = models => {
    Feature.hasMany(models.CarFeature);
  };

  return Feature;
}