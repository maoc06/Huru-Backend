"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _listCities = _interopRequireDefault(require("./list-cities"));

var _addCity = _interopRequireDefault(require("./add-city"));

var _updateCity = _interopRequireDefault(require("./update-city"));

var _dataAccess = require("../../data-access");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const listCities = (0, _listCities.default)({
  cityDb: _dataAccess.cityDb
});
const addCity = (0, _addCity.default)({
  cityDb: _dataAccess.cityDb
});
const updateCity = (0, _updateCity.default)({
  cityDb: _dataAccess.cityDb
});
var _default = {
  listCities,
  addCity,
  updateCity
};
exports.default = _default;