"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _expressCallback = _interopRequireDefault(require("../express-callback"));

var _authorization = _interopRequireDefault(require("../utils/middlewares/authorization"));

var _role = require("../utils/role");

var _controllers = require("../controllers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getCarRoutes() {
  const router = _express.default.Router();

  router.get('/by-user/:id', (0, _authorization.default)([_role.Normal, _role.Admin]), (0, _expressCallback.default)(_controllers.carControllers.getCarByUserOwner));
  router.get('/by-vin/:vin', (0, _authorization.default)([_role.Normal, _role.Admin]), (0, _expressCallback.default)(_controllers.carControllers.getCarByVin));
  router.get('/by-license/:license', (0, _authorization.default)([_role.Normal, _role.Admin]), (0, _expressCallback.default)(_controllers.carControllers.getCarByLicensePlate));
  router.post('/', (0, _authorization.default)([_role.Normal, _role.Admin]), (0, _expressCallback.default)(_controllers.carControllers.postCar));
  return router;
}

var _default = getCarRoutes;
exports.default = _default;