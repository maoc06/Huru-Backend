"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = buildBookingModel;

var _sequelize = require("sequelize");

function buildBookingModel({
  client
}) {
  return client.define('booking', {
    id: {
      type: _sequelize.DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      field: 'booking_id'
    },
    bookingCar: {
      type: _sequelize.DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      field: 'car_id'
    },
    bookingBy: {
      type: _sequelize.DataTypes.UUIDV4,
      allowNull: false,
      field: 'user_id'
    },
    checkin: {
      type: _sequelize.DataTypes.DATE,
      allowNull: false,
      field: 'check_in_date'
    },
    checkout: {
      type: _sequelize.DataTypes.DATE,
      allowNull: false,
      field: 'check_out_date'
    },
    transactionId: {
      type: _sequelize.DataTypes.INTEGER,
      allowNull: false,
      field: 'transaction_id'
    },
    pricePerDay: {
      type: _sequelize.DataTypes.DOUBLE,
      allowNull: false,
      field: 'price_per_day'
    },
    siteFees: {
      type: _sequelize.DataTypes.DOUBLE,
      allowNull: false,
      field: 'site_fees'
    },
    isRefund: {
      type: _sequelize.DataTypes.BOOLEAN,
      allowNull: true,
      field: 'is_refund'
    },
    isCancel: {
      type: _sequelize.DataTypes.BOOLEAN,
      allowNull: true,
      field: 'is_cancel'
    },
    cancelDate: {
      type: _sequelize.DataTypes.DATE,
      allowNull: true,
      field: 'cancel_date'
    },
    refundPaid: {
      type: _sequelize.DataTypes.DOUBLE,
      allowNull: true,
      field: 'refund_paid'
    },
    bookingDate: {
      type: _sequelize.DataTypes.DATE,
      field: 'booking_date'
    },
    bookingAddress: {
      type: _sequelize.DataTypes.STRING(255),
      allowNull: true,
      field: 'booking_address'
    },
    bookingLongitude: {
      type: _sequelize.DataTypes.DOUBLE,
      allowNull: true,
      field: 'booking_longitude'
    },
    bookingLatitude: {
      type: _sequelize.DataTypes.DOUBLE,
      allowNull: true,
      field: 'booking_latitude'
    },
    modifiedAt: {
      type: _sequelize.DataTypes.DATE,
      field: 'modified'
    },
    bookingStatus: {
      type: _sequelize.DataTypes.INTEGER,
      allowNull: false,
      field: 'booking_status_id'
    }
  }, {
    timestamps: false,
    freezeTableName: true
  });
}