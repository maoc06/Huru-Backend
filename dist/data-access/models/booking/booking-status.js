"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = buildBookingStatusModel;

var _sequelize = require("sequelize");

function buildBookingStatusModel({
  client
}) {
  return client.define('BookingStatus', {
    statusId: {
      type: _sequelize.DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      field: 'booking_status_id'
    },
    name: {
      type: _sequelize.DataTypes.STRING(25),
      allowNull: false
    }
  }, {
    tableName: 'booking_status',
    timestamps: false
  });
}