"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _multer = _interopRequireDefault(require("multer"));

var _expressCallback = _interopRequireDefault(require("../express-callback"));

var _authorization = _interopRequireDefault(require("../utils/middlewares/authorization"));

var _role = require("../utils/role");

var _controllers = require("../controllers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const storage = _multer.default.memoryStorage();

const upload = (0, _multer.default)({
  storage
});

function getCarBasicsRoutes() {
  const router = _express.default.Router();

  router.get('/car-models', (0, _authorization.default)([_role.Normal, _role.Admin]), (0, _expressCallback.default)(_controllers.carBasicsSettingsControllers.getModels));
  router.get('/car-models-by-maker/:makerId', (0, _authorization.default)([_role.Normal, _role.Admin]), (0, _expressCallback.default)(_controllers.carBasicsSettingsControllers.getCarModelsByMaker));
  router.get('/odometer-range', (0, _authorization.default)([_role.Normal, _role.Admin]), (0, _expressCallback.default)(_controllers.carBasicsSettingsControllers.getOdometer));
  router.get('/transmissions', (0, _authorization.default)([_role.Normal, _role.Admin]), (0, _expressCallback.default)(_controllers.carBasicsSettingsControllers.getTrasmission));
  router.get('/advance-notice', (0, _authorization.default)([_role.Normal, _role.Admin]), (0, _expressCallback.default)(_controllers.carBasicsSettingsControllers.getAdvanceNotice));
  router.get('/min-trip', (0, _authorization.default)([_role.Normal, _role.Admin]), (0, _expressCallback.default)(_controllers.carBasicsSettingsControllers.getMinTrip));
  router.get('/max-trip', (0, _authorization.default)([_role.Normal, _role.Admin]), (0, _expressCallback.default)(_controllers.carBasicsSettingsControllers.getMaxTrip));
  router.get('/features-opts', (0, _authorization.default)([_role.Normal, _role.Admin]), (0, _expressCallback.default)(_controllers.carBasicsSettingsControllers.getFeaturesOpts));
  router.post('/set-car-features', (0, _authorization.default)([_role.Normal]), (0, _expressCallback.default)(_controllers.carBasicsSettingsControllers.postCarFeatures));
  router.post('/set-car-image', upload.single('file'), (0, _authorization.default)([_role.Normal]), (0, _expressCallback.default)(_controllers.carBasicsSettingsControllers.postCarImage));
  router.put('/set-owner-car-image', (0, _authorization.default)([_role.Normal]), (0, _expressCallback.default)(_controllers.carBasicsSettingsControllers.putOwnerCarImage));
  return router;
}

var _default = getCarBasicsRoutes;
exports.default = _default;