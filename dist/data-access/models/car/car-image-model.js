"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = buildCarImageModel;

var _sequelize = require("sequelize");

function buildCarImageModel({
  client
}) {
  const CarImage = client.define('CarImage', {
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
      field: 'car_id',
      references: {
        model: 'Car',
        // CarImage belongsTo Car 1:1
        key: 'carId'
      }
    },
    addedBy: {
      type: _sequelize.DataTypes.UUIDV4,
      allowNull: false,
      field: 'added_by_user',
      references: {
        model: 'UserType',
        // CarImage belongsTo User 1:1
        key: 'uuid'
      }
    },
    imagePath: {
      type: _sequelize.DataTypes.STRING(255),
      allowNull: false,
      field: 'image',
      validate: {
        isUrl: true
      }
    }
  }, {
    tableName: 'car_image',
    timestamps: false
  });

  CarImage.associate = models => {
    CarImage.belongsTo(models.Car, {
      foreignKey: 'carId'
    });
    CarImage.belongsTo(models.User, {
      foreignKey: 'addedBy'
    });
  };

  return CarImage;
}