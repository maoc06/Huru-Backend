"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _addCar = _interopRequireDefault(require("./add-car"));

var _listCar = _interopRequireDefault(require("./list-car"));

var _listCarsByUserOwner = _interopRequireDefault(require("./list-cars-by-user-owner"));

var _listByVin = _interopRequireDefault(require("./list-by-vin"));

var _listByLicensePlate = _interopRequireDefault(require("./list-by-license-plate"));

var _listCarsByCity = _interopRequireDefault(require("./list-cars-by-city"));

var _listFeaturesByCar = _interopRequireDefault(require("./list-features-by-car"));

var _updateVisibility = _interopRequireDefault(require("./update-visibility"));

var _updateDisable = _interopRequireDefault(require("./update-disable"));

var _updateBookingTerms = _interopRequireDefault(require("./update-booking-terms"));

var _updateFeatures = _interopRequireDefault(require("./update-features"));

var _dataAccess = require("../../data-access");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const addCar = (0, _addCar.default)({
  carDb: _dataAccess.carDb,
  userDb: _dataAccess.userDb
});
const listCar = (0, _listCar.default)({
  carDb: _dataAccess.carDb
});
const listByUserOwner = (0, _listCarsByUserOwner.default)({
  carDb: _dataAccess.carDb,
  userDb: _dataAccess.userDb
});
const listByVin = (0, _listByVin.default)({
  carDb: _dataAccess.carDb
});
const listByLicensePlate = (0, _listByLicensePlate.default)({
  carDb: _dataAccess.carDb
});
const listCarsByCity = (0, _listCarsByCity.default)({
  carDb: _dataAccess.carDb
});
const listFeaturesByCar = (0, _listFeaturesByCar.default)({
  carDb: _dataAccess.carDb
});
const updateVisibility = (0, _updateVisibility.default)({
  carDb: _dataAccess.carDb
});
const updateDisable = (0, _updateDisable.default)({
  carDb: _dataAccess.carDb
});
const updateBookingTerms = (0, _updateBookingTerms.default)({
  carDb: _dataAccess.carDb
});
const updateFeatures = (0, _updateFeatures.default)({
  carDb: _dataAccess.carDb
});
var _default = {
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
};
exports.default = _default;