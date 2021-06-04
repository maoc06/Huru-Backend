"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = buildFavoriteModel;

var _sequelize = require("sequelize");

function buildFavoriteModel({
  client
}) {
  return client.define('favorite', {
    favoriteId: {
      type: _sequelize.DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: true,
      field: 'favorite_id'
    },
    addedBy: {
      type: _sequelize.DataTypes.UUIDV4,
      allowNull: false,
      field: 'added_by_user'
    },
    carId: {
      type: _sequelize.DataTypes.INTEGER,
      allowNull: false,
      field: 'car_id'
    }
  }, {
    timestamps: false,
    freezeTableName: true
  });
}