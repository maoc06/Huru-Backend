"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _addFavorite = _interopRequireDefault(require("./add-favorite"));

var _listByUser = _interopRequireDefault(require("./list-by-user"));

var _removeFavorite = _interopRequireDefault(require("./remove-favorite"));

var _dataAccess = require("../../data-access");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const addFavorite = (0, _addFavorite.default)({
  favoriteDb: _dataAccess.favoriteDb
});
const listByUser = (0, _listByUser.default)({
  favoriteDb: _dataAccess.favoriteDb,
  userDb: _dataAccess.userDb
});
const removeFavorite = (0, _removeFavorite.default)({
  favoriteDb: _dataAccess.favoriteDb
});
var _default = {
  addFavorite,
  listByUser,
  removeFavorite
};
exports.default = _default;