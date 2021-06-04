"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = buildCarReviewModel;

var _sequelize = require("sequelize");

function buildCarReviewModel({
  client
}) {
  return client.define('CarReview', {
    id: {
      type: _sequelize.DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      field: 'car_review_id'
    },
    carId: {
      type: _sequelize.DataTypes.INTEGER,
      allowNull: false,
      field: 'car_id'
    },
    addedBy: {
      type: _sequelize.DataTypes.UUIDV4,
      allowNull: false,
      field: 'review_by_user'
    },
    bookingId: {
      type: _sequelize.DataTypes.INTEGER,
      allowNull: false,
      field: 'booking_id'
    },
    comment: {
      type: _sequelize.DataTypes.TEXT,
      allowNull: false
    },
    rating: {
      type: _sequelize.DataTypes.REAL,
      allowNull: false
    },
    createdAt: {
      type: _sequelize.DataTypes.DATE,
      field: 'created'
    }
  }, {
    tableName: 'car_review',
    timestamps: false
  });
}