"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeFavoriteDb;

var _models = require("./models");

const {
  Favorite
} = _models.FavoriteModels;
const {
  Car,
  Image,
  Maker,
  Model
} = _models.CarModels;

function makeFavoriteDb() {
  function findByUser(userId) {
    return Favorite.findAll({
      attributes: {
        exclude: ['carId']
      },
      where: {
        addedBy: userId
      },
      include: {
        model: Car,
        attributes: ['carId', 'year'],
        include: [{
          model: Image,
          as: 'images',
          where: {
            isMain: true
          }
        }, {
          model: Model,
          attributes: ['modelId', 'name']
        }, {
          model: Maker
        }]
      }
    });
  }

  function insert(favorite) {
    return Favorite.create(favorite);
  }

  function remove({
    addedBy,
    carId
  }) {
    return Favorite.destroy({
      where: {
        addedBy,
        carId
      }
    });
  }

  return Object.freeze({
    findByUser,
    insert,
    remove
  });
}