"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "carModel", {
  enumerable: true,
  get: function () {
    return _carModel.default;
  }
});
Object.defineProperty(exports, "carModelModel", {
  enumerable: true,
  get: function () {
    return _carModelModel.default;
  }
});
Object.defineProperty(exports, "categoryModel", {
  enumerable: true,
  get: function () {
    return _categoryModel.default;
  }
});
Object.defineProperty(exports, "odometerRangeModel", {
  enumerable: true,
  get: function () {
    return _odometerRangeModel.default;
  }
});
Object.defineProperty(exports, "trasmissionModel", {
  enumerable: true,
  get: function () {
    return _transmissionModel.default;
  }
});
Object.defineProperty(exports, "advanceNoticeModel", {
  enumerable: true,
  get: function () {
    return _advanceNoticeModel.default;
  }
});
Object.defineProperty(exports, "minTripModel", {
  enumerable: true,
  get: function () {
    return _minTripDurationModel.default;
  }
});
Object.defineProperty(exports, "maxTripModel", {
  enumerable: true,
  get: function () {
    return _maxTripDurationModel.default;
  }
});
Object.defineProperty(exports, "featureOptsModel", {
  enumerable: true,
  get: function () {
    return _featureModel.default;
  }
});
Object.defineProperty(exports, "carFeatureModel", {
  enumerable: true,
  get: function () {
    return _carFeatureModel.default;
  }
});
Object.defineProperty(exports, "carImageModel", {
  enumerable: true,
  get: function () {
    return _carImageModel.default;
  }
});
Object.defineProperty(exports, "carReview", {
  enumerable: true,
  get: function () {
    return _carReviewModel.default;
  }
});
exports.default = void 0;

var _client = _interopRequireDefault(require("../../client"));

var _carModel = _interopRequireDefault(require("./car-model"));

var _carModelModel = _interopRequireDefault(require("./car-model-model"));

var _makerModel = _interopRequireDefault(require("./maker-model"));

var _categoryModel = _interopRequireDefault(require("./category-model"));

var _odometerRangeModel = _interopRequireDefault(require("./odometer-range-model"));

var _transmissionModel = _interopRequireDefault(require("./transmission-model"));

var _advanceNoticeModel = _interopRequireDefault(require("./advance-notice-model"));

var _minTripDurationModel = _interopRequireDefault(require("./min-trip-duration-model"));

var _maxTripDurationModel = _interopRequireDefault(require("./max-trip-duration-model"));

var _fuelModel = _interopRequireDefault(require("./fuel-model"));

var _featureModel = _interopRequireDefault(require("./feature-model"));

var _carFeatureModel = _interopRequireDefault(require("./car-feature-model"));

var _carImageModel = _interopRequireDefault(require("./car-image-model"));

var _carReviewModel = _interopRequireDefault(require("./car-review-model"));

var _modelCategoryModel = _interopRequireDefault(require("./model-category-model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const AdvanceNotice = (0, _advanceNoticeModel.default)(_client.default);
const Car = (0, _carModel.default)(_client.default);
const CarFeature = (0, _carFeatureModel.default)(_client.default);
const Category = (0, _categoryModel.default)(_client.default);
const Feature = (0, _featureModel.default)(_client.default);
const Fuel = (0, _fuelModel.default)(_client.default);
const Image = (0, _carImageModel.default)(_client.default);
const Maker = (0, _makerModel.default)(_client.default);
const MaxTrip = (0, _maxTripDurationModel.default)(_client.default);
const MinTrip = (0, _minTripDurationModel.default)(_client.default);
const Model = (0, _carModelModel.default)(_client.default);
const ModelCategory = (0, _modelCategoryModel.default)(_client.default);
const CarReview = (0, _carReviewModel.default)(_client.default);
const Odometer = (0, _odometerRangeModel.default)(_client.default);
const Transmission = (0, _transmissionModel.default)(_client.default); // Associations start

AdvanceNotice.hasMany(Car, {
  foreignKey: 'advanceNoticeId'
});
Car.belongsTo(AdvanceNotice, {
  as: 'advanceNotice',
  foreignKey: 'advanceNoticeId'
});
Car.belongsTo(Fuel, {
  as: 'fuel',
  foreignKey: 'fuelId'
});
Car.belongsTo(Maker, {
  foreignKey: 'makerId'
});
Car.belongsTo(Model, {
  foreignKey: 'modelId'
});
Car.belongsTo(MaxTrip, {
  as: 'maxTrip',
  foreignKey: 'maxTripDurationId'
});
Car.belongsTo(MinTrip, {
  as: 'minTrip',
  foreignKey: 'minTripDurationId'
});
Car.hasMany(CarFeature, {
  as: 'features',
  foreignKey: 'carId'
});
Car.hasMany(Image, {
  as: 'images',
  foreignKey: 'carId'
});
Car.hasMany(CarReview, {
  as: 'reviews',
  foreignKey: 'carId'
});
CarFeature.belongsTo(Car, {
  foreignKey: 'carId'
});
CarFeature.belongsTo(Feature, {
  foreignKey: 'featureId'
});
Feature.hasMany(CarFeature, {
  foreignKey: 'featureId'
});
Fuel.hasMany(Car, {
  foreignKey: 'fuelId'
});
Image.belongsTo(Car, {
  foreignKey: 'carId'
});
Maker.hasMany(Car, {
  foreignKey: 'makerId'
});
Maker.hasMany(Model, {
  foreignKey: 'makerId'
});
Model.belongsTo(Maker, {
  foreignKey: 'makerId'
});
Model.hasMany(Car, {
  foreignKey: 'modelId'
});
Model.hasMany(ModelCategory, {
  as: 'categories',
  foreignKey: 'modelId'
});
ModelCategory.belongsTo(Model, {
  foreignKey: 'modelId'
});
ModelCategory.belongsTo(Category, {
  foreignKey: 'categoryId'
});
CarReview.belongsTo(Car, {
  foreignKey: 'carId'
}); // Associations end

var _default = {
  AdvanceNotice,
  Car,
  CarFeature,
  Category,
  Feature,
  Fuel,
  Image,
  Maker,
  MaxTrip,
  MinTrip,
  Model,
  ModelCategory,
  CarReview,
  Odometer,
  Transmission
};
exports.default = _default;