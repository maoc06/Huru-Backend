"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = buildCarFeatureModel;

var _sequelize = require("sequelize");

function buildCarFeatureModel({
  client
}) {
  const CarFeature = client.define('CarFeature', {
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
      field: 'car_id',
      references: {
        model: 'Car',
        // Car-Feature belongsTo Car 1:1
        key: 'carId'
      }
    },
    featureId: {
      type: _sequelize.DataTypes.INTEGER,
      allowNull: false,
      field: 'feature_id',
      references: {
        model: 'Feature',
        // Car-Feature belongsTo Feature 1:1
        key: 'featureId'
      }
    }
  }, {
    tableName: 'car_feature',
    timestamps: false
  });

  CarFeature.associate = models => {
    CarFeature.belongsTo(models.Car, {
      foreignKey: 'carId'
    });
    CarFeature.belongsTo(models.Feature, {
      foreignKey: 'featureId'
    });
  };

  return CarFeature;
}