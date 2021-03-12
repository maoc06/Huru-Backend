"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _useCases = require("../../use-cases");

var _getCities = _interopRequireDefault(require("./get-cities"));

var _postCity = _interopRequireDefault(require("./post-city"));

var _putCity = _interopRequireDefault(require("./put-city"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  listCities,
  addCity,
  updateCity
} = _useCases.cityUseCases;
const getCities = (0, _getCities.default)({
  listCities
});
const postCity = (0, _postCity.default)({
  addCity
});
const putCity = (0, _putCity.default)({
  updateCity
});
var _default = {
  getCities,
  postCity,
  putCity
};
exports.default = _default;