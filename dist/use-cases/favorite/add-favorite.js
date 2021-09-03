Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = makeAddFavorite;

const _entities = require('../../entities');

function makeAddFavorite({ favoriteDb }) {
  return function addFavorite(favoriteInfo) {
    const favorite = (0, _entities.makeFavorite)(favoriteInfo);
    return favoriteDb.insert(favorite);
  };
}
