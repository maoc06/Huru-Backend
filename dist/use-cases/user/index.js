"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _listUser = _interopRequireDefault(require("./list-user"));

var _listReviews = _interopRequireDefault(require("./list-reviews"));

var _listIfAlreadyReviewed = _interopRequireDefault(require("./list-if-already-reviewed"));

var _addReview = _interopRequireDefault(require("./add-review"));

var _updateData = _interopRequireDefault(require("./update-data"));

var _updatePassword = _interopRequireDefault(require("./update-password"));

var _updatePhone = _interopRequireDefault(require("./update-phone"));

var _uploadProfilePic = _interopRequireDefault(require("./upload-profile-pic"));

var _updateProfilePic = _interopRequireDefault(require("./update-profile-pic"));

var _dataAccess = require("../../data-access");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const addUserReview = (0, _addReview.default)({
  userDb: _dataAccess.userDb
});
const listUser = (0, _listUser.default)({
  userDb: _dataAccess.userDb
});
const listIfAlreadyReviewed = (0, _listIfAlreadyReviewed.default)({
  userDb: _dataAccess.userDb,
  bookingDb: _dataAccess.bookingDb
});
const listReviews = (0, _listReviews.default)({
  userDb: _dataAccess.userDb
});
const updateData = (0, _updateData.default)({
  userDb: _dataAccess.userDb
});
const updatePassword = (0, _updatePassword.default)({
  userDb: _dataAccess.userDb
});
const updatePhone = (0, _updatePhone.default)({
  userDb: _dataAccess.userDb
});
const uploadProfilePic = (0, _uploadProfilePic.default)({
  userDb: _dataAccess.userDb
});
const updateProfilePic = (0, _updateProfilePic.default)({
  userDb: _dataAccess.userDb
});
var _default = {
  addUserReview,
  listUser,
  listIfAlreadyReviewed,
  listReviews,
  updateData,
  updatePassword,
  updatePhone,
  uploadProfilePic,
  updateProfilePic
};
exports.default = _default;