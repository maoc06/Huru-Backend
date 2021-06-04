"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _useCases = require("../../use-cases");

var _postFavorite = _interopRequireDefault(require("./post-favorite"));

var _getByUser = _interopRequireDefault(require("./get-by-user"));

var _deleteFavorite = _interopRequireDefault(require("./delete-favorite"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  addFavorite,
  listByUser,
  removeFavorite
} = _useCases.favoriteUseCases;
const postFavorite = (0, _postFavorite.default)({
  addFavorite
});
const getByUser = (0, _getByUser.default)({
  listByUser
});
const deleteFavorite = (0, _deleteFavorite.default)({
  removeFavorite
});
var _default = {
  postFavorite,
  getByUser,
  deleteFavorite
};
exports.default = _default;