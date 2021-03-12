"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _useCases = require("../../use-cases");

var _postCar = _interopRequireDefault(require("./post-car"));

var _getCarByUserOwner = _interopRequireDefault(require("./get-car-by-user-owner"));

var _getCarByVin = _interopRequireDefault(require("./get-car-by-vin"));

var _getCarByLicensePlate = _interopRequireDefault(require("./get-car-by-license-plate"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  addCar,
  listByUserOwner,
  listByVin,
  listByLicensePlate
} = _useCases.carUseCases;
const postCar = (0, _postCar.default)({
  addCar
});
const getCarByUserOwner = (0, _getCarByUserOwner.default)({
  listByUserOwner
});
const getCarByVin = (0, _getCarByVin.default)({
  listByVin
});
const getCarByLicensePlate = (0, _getCarByLicensePlate.default)({
  listByLicensePlate
});
var _default = {
  postCar,
  getCarByUserOwner,
  getCarByVin,
  getCarByLicensePlate
};
exports.default = _default;