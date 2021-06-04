"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _expressCallback = _interopRequireDefault(require("../express-callback"));

var _authorization = _interopRequireDefault(require("../utils/middlewares/authorization"));

var _role = require("../utils/role");

var _verifyToken = _interopRequireDefault(require("../utils/middlewares/verify-token"));

var _controllers = require("../controllers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getCarRoutes() {
  const router = _express.default.Router();

  router.get('/:carId', (0, _expressCallback.default)(_controllers.carControllers.getCar));
  router.get('/by-user/:id', (0, _expressCallback.default)(_controllers.carControllers.getCarByUserOwner));
  router.get('/by-vin/:vin', _verifyToken.default, (0, _authorization.default)([_role.Normal, _role.Admin]), (0, _expressCallback.default)(_controllers.carControllers.getCarByVin));
  router.get('/by-license/:license', _verifyToken.default, (0, _authorization.default)([_role.Normal, _role.Admin]), (0, _expressCallback.default)(_controllers.carControllers.getCarByLicensePlate));
  router.get('/features/:carId', (0, _expressCallback.default)(_controllers.carControllers.getFeaturesByCar));
  router.post('/', _verifyToken.default, (0, _authorization.default)([_role.Normal, _role.Admin]), (0, _expressCallback.default)(_controllers.carControllers.postCar));
  router.patch('/visibility', _verifyToken.default, (0, _authorization.default)([_role.Normal, _role.Admin]), (0, _expressCallback.default)(_controllers.carControllers.patchVisibility));
  router.patch('/disable', _verifyToken.default, (0, _authorization.default)([_role.Normal, _role.Admin]), (0, _expressCallback.default)(_controllers.carControllers.patchDisable));
  router.patch('/booking-terms', _verifyToken.default, (0, _authorization.default)([_role.Normal, _role.Admin]), (0, _expressCallback.default)(_controllers.carControllers.patchBookingTerms));
  router.put('/features', _verifyToken.default, (0, _authorization.default)([_role.Normal, _role.Admin]), (0, _expressCallback.default)(_controllers.carControllers.putFeatures));
  return router;
}

var _default = getCarRoutes;
exports.default = _default;