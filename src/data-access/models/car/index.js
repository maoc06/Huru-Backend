import client from '../../client';

import buildCarModel from './car-model';
import buildCarModelModel from './car-model-model';
import buildMakerModel from './maker-model';
import buildCategoryModel from './category-model';
import buildOdometerRangeModel from './odometer-range-model';
import buildTransmissionModel from './transmission-model';
import buildAdvanceNoticeModel from './advance-notice-model';
import buildMinTripDurationModel from './min-trip-duration-model';
import buildMaxTripDurationModel from './max-trip-duration-model';
import buildFuelModel from './fuel-model';
import buildFeatureModel from './feature-model';
import buildCarFeatureModel from './car-feature-model';
import buildCarImageModel from './car-image-model';
import buildCarReviewModel from './car-review-model';
import buildModelCategoryModel from './model-category-model';

const AdvanceNotice = buildAdvanceNoticeModel(client);
const Car = buildCarModel(client);
const CarFeature = buildCarFeatureModel(client);
const Category = buildCategoryModel(client);
const Feature = buildFeatureModel(client);
const Fuel = buildFuelModel(client);
const Image = buildCarImageModel(client);
const Maker = buildMakerModel(client);
const MaxTrip = buildMaxTripDurationModel(client);
const MinTrip = buildMinTripDurationModel(client);
const Model = buildCarModelModel(client);
const ModelCategory = buildModelCategoryModel(client);
const CarReview = buildCarReviewModel(client);
const Odometer = buildOdometerRangeModel(client);
const Transmission = buildTransmissionModel(client);

// Associations start
AdvanceNotice.hasMany(Car, { foreignKey: 'advanceNoticeId' });

Car.belongsTo(AdvanceNotice, {
  as: 'advanceNotice',
  foreignKey: 'advanceNoticeId',
});
Car.belongsTo(Fuel, { as: 'fuel', foreignKey: 'fuelId' });
Car.belongsTo(Maker, { foreignKey: 'makerId' });
Car.belongsTo(Model, { foreignKey: 'modelId' });
Car.belongsTo(MaxTrip, { as: 'maxTrip', foreignKey: 'maxTripDurationId' });
Car.belongsTo(MinTrip, { as: 'minTrip', foreignKey: 'minTripDurationId' });
Car.hasMany(CarFeature, { as: 'features', foreignKey: 'carId' });
Car.hasMany(Image, { as: 'images', foreignKey: 'carId' });
Car.hasMany(CarReview, { as: 'reviews', foreignKey: 'carId' });

CarFeature.belongsTo(Car, { foreignKey: 'carId' });
CarFeature.belongsTo(Feature, { foreignKey: 'featureId' });

Feature.hasMany(CarFeature, { foreignKey: 'featureId' });

Fuel.hasMany(Car, { foreignKey: 'fuelId' });

Image.belongsTo(Car, { foreignKey: 'carId' });

Maker.hasMany(Car, { foreignKey: 'makerId' });
Maker.hasMany(Model, { foreignKey: 'makerId' });

Model.belongsTo(Maker, { foreignKey: 'makerId' });
Model.hasMany(Car, { foreignKey: 'modelId' });
Model.hasMany(ModelCategory, { as: 'categories', foreignKey: 'modelId' });

ModelCategory.belongsTo(Model, { foreignKey: 'modelId' });
ModelCategory.belongsTo(Category, { foreignKey: 'categoryId' });

CarReview.belongsTo(Car, { foreignKey: 'carId' });
// Associations end

export default {
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
  Transmission,
};

export {
  buildCarModel as carModel,
  buildCarModelModel as carModelModel,
  buildCategoryModel as categoryModel,
  buildOdometerRangeModel as odometerRangeModel,
  buildTransmissionModel as trasmissionModel,
  buildAdvanceNoticeModel as advanceNoticeModel,
  buildMinTripDurationModel as minTripModel,
  buildMaxTripDurationModel as maxTripModel,
  buildFeatureModel as featureOptsModel,
  buildCarFeatureModel as carFeatureModel,
  buildCarImageModel as carImageModel,
  buildCarReviewModel as carReview,
};
