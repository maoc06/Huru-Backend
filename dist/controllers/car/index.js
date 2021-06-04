"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _useCases = require("../../use-cases");

var _postCar = _interopRequireDefault(require("./post-car"));

var _getCar = _interopRequireDefault(require("./get-car"));

var _getCarByUserOwner = _interopRequireDefault(require("./get-car-by-user-owner"));

var _getCarByVin = _interopRequireDefault(require("./get-car-by-vin"));

var _getCarByLicensePlate = _interopRequireDefault(require("./get-car-by-license-plate"));

var _getCarsByCity = _interopRequireDefault(require("./get-cars-by-city"));

var _getFeaturesByCar = _interopRequireDefault(require("./get-features-by-car"));

var _patchVisibility = _interopRequireDefault(require("./patch-visibility"));

var _patchDisable = _interopRequireDefault(require("./patch-disable"));

var _patchBookingTerms = _interopRequireDefault(require("./patch-booking-terms"));

var _putFeatures = _interopRequireDefault(require("./put-features"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  addCar,
  listCar,
  listByUserOwner,
  listByVin,
  listByLicensePlate,
  listCarsByCity,
  listFeaturesByCar,
  updateVisibility,
  updateDisable,
  updateBookingTerms,
  updateFeatures
} = _useCases.carUseCases;
const postCar = (0, _postCar.default)({
  addCar
});
const getCar = (0, _getCar.default)({
  listCar
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
const getCarsByCity = (0, _getCarsByCity.default)({
  listCarsByCity
});
const getFeaturesByCar = (0, _getFeaturesByCar.default)({
  listFeaturesByCar
});
const patchVisibility = (0, _patchVisibility.default)({
  updateVisibility
});
const patchDisable = (0, _patchDisable.default)({
  updateDisable
});
const patchBookingTerms = (0, _patchBookingTerms.default)({
  updateBookingTerms
});
const putFeatures = (0, _putFeatures.default)({
  updateFeatures
});
var _default = {
  postCar,
  getCar,
  getCarByUserOwner,
  getCarByVin,
  getCarByLicensePlate,
  getCarsByCity,
  getFeaturesByCar,
  patchVisibility,
  patchDisable,
  patchBookingTerms,
  putFeatures
};
exports.default = _default;