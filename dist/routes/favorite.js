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

function getFavoriteRoutes() {
  const router = _express.default.Router();

  router.get('/by-user/:userId', (0, _authorization.default)([_role.Normal]), (0, _expressCallback.default)(_controllers.favoriteControllers.getByUser));
  router.post('/', (0, _authorization.default)([_role.Normal]), (0, _expressCallback.default)(_controllers.favoriteControllers.postFavorite));
  router.delete('/:addedBy/:carId', (0, _authorization.default)([_role.Normal]), (0, _expressCallback.default)(_controllers.favoriteControllers.deleteFavorite));
  return router;
}

var _default = getFavoriteRoutes;
exports.default = _default;