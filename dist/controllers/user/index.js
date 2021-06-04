"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _useCases = require("../../use-cases");

var _getUser = _interopRequireDefault(require("./get-user"));

var _getUserReviews = _interopRequireDefault(require("./get-user-reviews"));

var _getIfAlreadyReviewed = _interopRequireDefault(require("./get-if-already-reviewed"));

var _postUserReview = _interopRequireDefault(require("./post-user-review"));

var _postProfilePic = _interopRequireDefault(require("./post-profile-pic"));

var _patchPassword = _interopRequireDefault(require("./patch-password"));

var _patchPhone = _interopRequireDefault(require("./patch-phone"));

var _patchProfilePic = _interopRequireDefault(require("./patch-profile-pic"));

var _putUserData = _interopRequireDefault(require("./put-user-data"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  addUserReview,
  listUser,
  listReviews,
  listIfAlreadyReviewed,
  updateData,
  updatePassword,
  updatePhone,
  updateProfilePic,
  uploadProfilePic
} = _useCases.userUseCases;
const getUser = (0, _getUser.default)({
  listUser
});
const getUserReviews = (0, _getUserReviews.default)({
  listReviews
});
const getIfAlreadyReviewed = (0, _getIfAlreadyReviewed.default)({
  listIfAlreadyReviewed
});
const postUserReview = (0, _postUserReview.default)({
  addUserReview
});
const postProfilePic = (0, _postProfilePic.default)({
  uploadProfilePic
});
const patchPassword = (0, _patchPassword.default)({
  updatePassword
});
const patchPhone = (0, _patchPhone.default)({
  updatePhone
});
const patchProfilePic = (0, _patchProfilePic.default)({
  updateProfilePic
});
const putUserData = (0, _putUserData.default)({
  updateData
});
var _default = {
  getUser,
  getUserReviews,
  getIfAlreadyReviewed,
  postUserReview,
  postProfilePic,
  patchPassword,
  patchPhone,
  patchProfilePic,
  putUserData
};
exports.default = _default;