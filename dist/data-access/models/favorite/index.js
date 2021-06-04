"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _client = _interopRequireDefault(require("../../client"));

var _favoriteModel = _interopRequireDefault(require("./favorite-model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Favorite = (0, _favoriteModel.default)(_client.default);
var _default = {
  Favorite
};
exports.default = _default;