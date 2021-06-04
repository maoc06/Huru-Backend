"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeRemoveFavorite;

function makeRemoveFavorite({
  favoriteDb
}) {
  return function removeFavorite({
    addedBy,
    carId
  }) {
    // const favorite = makeFavorite(favoriteInfo);
    return favoriteDb.remove({
      addedBy,
      carId
    });
  };
}