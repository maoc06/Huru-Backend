"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = buildCarModel;

var _sequelize = require("sequelize");

function buildCarModel({
  client
}) {
  return client.define('car', {
    carId: {
      type: _sequelize.DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      field: 'car_id'
    },
    makerId: {
      type: _sequelize.DataTypes.INTEGER,
      allowNull: false,
      field: 'maker_id'
    },
    modelId: {
      type: _sequelize.DataTypes.INTEGER,
      allowNull: false,
      field: 'model_id'
    },
    year: {
      type: _sequelize.DataTypes.INTEGER,
      allowNull: false
    },
    vin: {
      type: _sequelize.DataTypes.STRING(17),
      allowNull: false,
      validate: {
        len: [17, 17]
      }
    },
    odometerRangeId: {
      type: _sequelize.DataTypes.INTEGER,
      allowNull: false,
      field: 'odometer_range_id'
    },
    licensePlate: {
      type: _sequelize.DataTypes.STRING(7),
      allowNull: false,
      field: 'license_plate'
    },
    description: {
      type: _sequelize.DataTypes.TEXT
    },
    cityId: {
      type: _sequelize.DataTypes.INTEGER,
      allowNull: false,
      field: 'city_id'
    },
    owner: {
      type: _sequelize.DataTypes.UUIDV4,
      allowNull: false,
      field: 'user_id'
    },
    price: {
      type: _sequelize.DataTypes.INTEGER,
      allowNull: false
    },
    advanceNoticeId: {
      type: _sequelize.DataTypes.INTEGER,
      allowNull: false,
      field: 'advance_notice_id'
    },
    minTripDurationId: {
      type: _sequelize.DataTypes.INTEGER,
      allowNull: false,
      field: 'min_trip_duration_id'
    },
    maxTripDurationId: {
      type: _sequelize.DataTypes.INTEGER,
      allowNull: false,
      field: 'max_trip_duration_id'
    },
    fuelId: {
      type: _sequelize.DataTypes.INTEGER,
      allowNull: false,
      field: 'fuel_id'
    },
    createdAt: {
      type: _sequelize.DataTypes.DATE,
      field: 'created'
    },
    modifiedAt: {
      type: _sequelize.DataTypes.DATE,
      field: 'modified'
    },
    status: {
      type: _sequelize.DataTypes.INTEGER,
      field: 'status_id'
    }
  }, {
    timestamps: false,
    freezeTableName: true
  });
}