"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _useCases = require("../../use-cases");

var _getModels = _interopRequireDefault(require("./get-models"));

var _getCarModelsByMakers = _interopRequireDefault(require("./get-car-models-by-makers"));

var _getOdometer = _interopRequireDefault(require("./get-odometer"));

var _getTransmission = _interopRequireDefault(require("./get-transmission"));

var _getAdvanceNotice = _interopRequireDefault(require("./get-advance-notice"));

var _getMinTrip = _interopRequireDefault(require("./get-min-trip"));

var _getMaxTrip = _interopRequireDefault(require("./get-max-trip"));

var _getFeaturesOptions = _interopRequireDefault(require("./get-features-options"));

var _postCarFeatures = _interopRequireDefault(require("./post-car-features"));

var _postCarImage = _interopRequireDefault(require("./post-car-image"));

var _putOwnerCarImage = _interopRequireDefault(require("./put-owner-car-image"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  listModels,
  listCarModelsByMaker,
  listOdometer,
  listTransmissions,
  listAdvanceNotice,
  listMinTrip,
  listMaxTrip,
  listFeaturesOpts,
  addCarFeatures,
  addCarImage,
  updateOwnerCarImage
} = _useCases.carBasicSettingsUseCases;
const getModels = (0, _getModels.default)({
  listModels
});
const getCarModelsByMaker = (0, _getCarModelsByMakers.default)({
  listCarModelsByMaker
});
const getOdometer = (0, _getOdometer.default)({
  listOdometer
});
const getTrasmission = (0, _getTransmission.default)({
  listTransmissions
});
const getAdvanceNotice = (0, _getAdvanceNotice.default)({
  listAdvanceNotice
});
const getMinTrip = (0, _getMinTrip.default)({
  listMinTrip
});
const getMaxTrip = (0, _getMaxTrip.default)({
  listMaxTrip
});
const getFeaturesOpts = (0, _getFeaturesOptions.default)({
  listFeaturesOpts
});
const postCarFeatures = (0, _postCarFeatures.default)({
  addCarFeatures
});
const postCarImage = (0, _postCarImage.default)({
  addCarImage
});
const putOwnerCarImage = (0, _putOwnerCarImage.default)({
  updateOwnerCarImage
});
var _default = {
  getModels,
  getCarModelsByMaker,
  getOdometer,
  getTrasmission,
  getAdvanceNotice,
  getMinTrip,
  getMaxTrip,
  getFeaturesOpts,
  postCarFeatures,
  postCarImage,
  putOwnerCarImage
};
exports.default = _default;