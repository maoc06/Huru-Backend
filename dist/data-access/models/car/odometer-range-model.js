"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = buildOdometerRangeModel;

var _sequelize = require("sequelize");

function buildOdometerRangeModel({
  client
}) {
  const OdometerRange = client.define('OdometerRange', {
    odometerRangeId: {
      type: _sequelize.DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      field: 'odometer_range_id'
    },
    range: {
      type: _sequelize.DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    tableName: 'odometer_range',
    timestamps: false
  });

  OdometerRange.associate = models => {
    OdometerRange.hasMany(models.Car);
  };

  return OdometerRange;
}