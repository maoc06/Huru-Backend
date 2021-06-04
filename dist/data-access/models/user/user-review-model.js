"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = buildUserReviewModel;

var _sequelize = require("sequelize");

function buildUserReviewModel({
  client
}) {
  return client.define('UserReview', {
    id: {
      type: _sequelize.DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      field: 'user_review_id'
    },
    userId: {
      type: _sequelize.DataTypes.INTEGER,
      allowNull: false,
      field: 'user_id'
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
    tableName: 'huru_user_review',
    timestamps: false
  });
}