"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = buildCarImageModel;

var _sequelize = require("sequelize");

function buildCarImageModel({
  client
}) {
  return client.define('CarImage', {
    carImageId: {
      type: _sequelize.DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      field: 'car_image_id'
    },
    carId: {
      type: _sequelize.DataTypes.INTEGER,
      allowNull: true,
      field: 'car_id'
    },
    addedBy: {
      type: _sequelize.DataTypes.UUIDV4,
      allowNull: false,
      field: 'added_by_user'
    },
    imagePath: {
      type: _sequelize.DataTypes.STRING(255),
      allowNull: false,
      field: 'image',
      validate: {
        isUrl: true
      }
    },
    isMain: {
      type: _sequelize.DataTypes.BOOLEAN,
      field: 'is_main_image'
    }
  }, {
    tableName: 'car_image',
    timestamps: false
  });
}