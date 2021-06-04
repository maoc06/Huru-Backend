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

var _verifyToken = _interopRequireDefault(require("../utils/middlewares/verify-token"));

var _controllers = require("../controllers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const storage = _multer.default.memoryStorage();

const upload = (0, _multer.default)({
  storage
});

function getUserRoutes() {
  const router = _express.default.Router();

  router.get('/:uuid', (0, _expressCallback.default)(_controllers.userControllers.getUser));
  router.get('/reviews/:userId', _verifyToken.default, (0, _authorization.default)([_role.Normal]), (0, _expressCallback.default)(_controllers.userControllers.getUserReviews));
  router.get('/already-reviewed/:bookingId', _verifyToken.default, (0, _authorization.default)([_role.Normal]), (0, _expressCallback.default)(_controllers.userControllers.getIfAlreadyReviewed));
  router.post('/review', _verifyToken.default, (0, _authorization.default)([_role.Normal]), (0, _expressCallback.default)(_controllers.userControllers.postUserReview));
  router.post('/profile-pic', upload.single('file'), (0, _expressCallback.default)(_controllers.userControllers.postProfilePic));
  router.patch('/password', _verifyToken.default, (0, _authorization.default)([_role.Normal]), (0, _expressCallback.default)(_controllers.userControllers.patchPassword));
  router.patch('/phone', _verifyToken.default, (0, _authorization.default)([_role.Normal]), (0, _expressCallback.default)(_controllers.userControllers.patchPhone));
  router.patch('/pic', _verifyToken.default, (0, _authorization.default)([_role.Normal]), upload.single('file'), (0, _expressCallback.default)(_controllers.userControllers.patchProfilePic));
  router.put('/', _verifyToken.default, (0, _authorization.default)([_role.Normal]), (0, _expressCallback.default)(_controllers.userControllers.putUserData));
  return router;
}

var _default = getUserRoutes;
exports.default = _default;