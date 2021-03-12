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

function getMakerRoutes() {
  const router = _express.default.Router();

  router.get('/', (0, _authorization.default)([_role.Normal, _role.Admin]), (0, _expressCallback.default)(_controllers.makerControllers.getMakers));
  router.get('/:id', (0, _authorization.default)([_role.Normal, _role.Admin]), (0, _expressCallback.default)(_controllers.makerControllers.getMakers));
  return router;
}

var _default = getMakerRoutes;
exports.default = _default;