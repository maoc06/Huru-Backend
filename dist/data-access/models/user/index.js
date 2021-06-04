"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "user", {
  enumerable: true,
  get: function () {
    return _userModel.default;
  }
});
Object.defineProperty(exports, "userType", {
  enumerable: true,
  get: function () {
    return _userTypeModel.default;
  }
});
exports.default = void 0;

var _client = _interopRequireDefault(require("../../client"));

var _userModel = _interopRequireDefault(require("./user-model"));

var _userTypeModel = _interopRequireDefault(require("./user-type-model"));

var _userReviewModel = _interopRequireDefault(require("./user-review-model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Type = (0, _userTypeModel.default)(_client.default);
const User = (0, _userModel.default)(_client.default);
const UserReview = (0, _userReviewModel.default)(_client.default); // Associations start

Type.hasMany(User, {
  foreignKey: 'userType'
});
User.belongsTo(Type, {
  foreignKey: 'userType'
});
User.hasMany(UserReview, {
  foreignKey: 'addedBy'
}); // User.hasMany(UserReview, { foreignKey: 'userId' });

UserReview.belongsTo(User, {
  as: 'reviewBy',
  foreignKey: 'addedBy'
}); // UserReview.belongsTo(User, { foreignKey: 'userId' });
// Associations end

var _default = {
  User,
  Type,
  UserReview
};
exports.default = _default;