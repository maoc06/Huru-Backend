"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _listModels = _interopRequireDefault(require("./list-models"));

var _listCarCategories = _interopRequireDefault(require("./list-car-categories"));

var _listCarModelsByMaker = _interopRequireDefault(require("./list-car-models-by-maker"));

var _listOdometers = _interopRequireDefault(require("./list-odometers"));

var _listTransmissions = _interopRequireDefault(require("./list-transmissions"));

var _listAdvanceNotice = _interopRequireDefault(require("./list-advance-notice"));

var _listMinTrip = _interopRequireDefault(require("./list-min-trip"));

var _listMaxTrip = _interopRequireDefault(require("./list-max-trip"));

var _listFuel = _interopRequireDefault(require("./list-fuel"));

var _listFeaturesOptions = _interopRequireDefault(require("./list-features-options"));

var _addCarFeatures = _interopRequireDefault(require("./add-car-features"));

var _addCarImages = _interopRequireDefault(require("./add-car-images"));

var _updateOwnerCarImage = _interopRequireDefault(require("./update-owner-car-image"));

var _removeCarImage = _interopRequireDefault(require("./remove-car-image"));

var _dataAccess = require("../../data-access");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const listModels = (0, _listModels.default)({
  carBasicSettingsDb: _dataAccess.carBasicSettingsDb
});
const listCarModelsByMaker = (0, _listCarModelsByMaker.default)({
  carBasicSettingsDb: _dataAccess.carBasicSettingsDb,
  makerDb: _dataAccess.makerDb
});
const listCarCategories = (0, _listCarCategories.default)({
  carBasicSettingsDb: _dataAccess.carBasicSettingsDb
});
const listOdometer = (0, _listOdometers.default)({
  carBasicSettingsDb: _dataAccess.carBasicSettingsDb
});
const listTransmissions = (0, _listTransmissions.default)({
  carBasicSettingsDb: _dataAccess.carBasicSettingsDb
});
const listAdvanceNotice = (0, _listAdvanceNotice.default)({
  carBasicSettingsDb: _dataAccess.carBasicSettingsDb
});
const listMinTrip = (0, _listMinTrip.default)({
  carBasicSettingsDb: _dataAccess.carBasicSettingsDb
});
const listMaxTrip = (0, _listMaxTrip.default)({
  carBasicSettingsDb: _dataAccess.carBasicSettingsDb
});
const listFeaturesOpts = (0, _listFeaturesOptions.default)({
  carBasicSettingsDb: _dataAccess.carBasicSettingsDb
});
const listFuel = (0, _listFuel.default)({
  carBasicSettingsDb: _dataAccess.carBasicSettingsDb
});
const addCarFeatures = (0, _addCarFeatures.default)({
  carBasicSettingsDb: _dataAccess.carBasicSettingsDb,
  carDb: _dataAccess.carDb
});
const addCarImage = (0, _addCarImages.default)({
  carBasicSettingsDb: _dataAccess.carBasicSettingsDb,
  userDb: _dataAccess.userDb
});
const updateOwnerCarImage = (0, _updateOwnerCarImage.default)({
  carBasicSettingsDb: _dataAccess.carBasicSettingsDb
});
const removeCarImage = (0, _removeCarImage.default)({
  carBasicSettingsDb: _dataAccess.carBasicSettingsDb
});
var _default = {
  listModels,
  listCarModelsByMaker,
  listCarCategories,
  listOdometer,
  listTransmissions,
  listAdvanceNotice,
  listMinTrip,
  listMaxTrip,
  listFuel,
  listFeaturesOpts,
  addCarFeatures,
  addCarImage,
  updateOwnerCarImage,
  removeCarImage
};
exports.default = _default;