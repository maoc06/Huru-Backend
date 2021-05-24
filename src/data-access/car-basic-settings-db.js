import {
  // carModel,
  // categoryModel,
  // odometerRangeModel,
  // trasmissionModel,
  // advanceNoticeModel,
  // minTripModel,
  // maxTripModel,
  featureOptsModel,
  carFeatureModel,
  carImageModel,
} from './models/car';

import { CarModels } from './models';

import { uploadFileS3 } from '../utils/actions-s3';

const {
  Category,
  Model,
  AdvanceNotice,
  MaxTrip,
  MinTrip,
  Odometer,
  Transmission,
} = CarModels;

export default function makeCarBasicSettingsDb({ client }) {
  function findAllModels() {
    return Model.findAll();
  }

  function findAllCarCategories() {
    // const category = categoryModel({ client });
    return Category.findAll();
  }

  function findModelsByMaker(makerId) {
    return Model.findAll({ where: { makerId } });
  }

  function findAllOdometerRange() {
    // const odometer = odometerRangeModel({ client });
    return Odometer.findAll();
  }

  function findAllTransmissions() {
    // const transmission = trasmissionModel({ client });
    return Transmission.findAll();
  }

  function findAllAdvanceNotice() {
    // const advanceNotice = advanceNoticeModel({ client });
    return AdvanceNotice.findAll();
  }

  function findAllMinTripDurations() {
    // const minTrip = minTripModel({ client });
    return MinTrip.findAll();
  }

  function findAllMaxTripDurations() {
    // const maxTrip = maxTripModel({ client });
    return MaxTrip.findAll();
  }

  function findAllFeaturesOpts() {
    const features = featureOptsModel({ client });
    return features.findAll();
  }

  function findFeatureById(featureId) {
    const feature = featureOptsModel({ client });
    return feature.findAll({ where: { featureId } });
  }

  function findFeatureByCarId(carId) {
    const carFetures = carFeatureModel({ client });
    return carFetures.findAll({ where: { carId } });
  }

  function insertCarFeatures(selectedFeatures) {
    const carFetures = carFeatureModel({ client });
    return carFetures.bulkCreate(selectedFeatures);
  }

  async function insertCarImage(imageInfo) {
    const { photoFile, uid, carId, isMain } = imageInfo;

    const s3 = await uploadFileS3(photoFile, 'vehicles');

    if (!s3.success) throw new Error('Error uploading the image');

    const carImageObj = { addedBy: uid, imagePath: s3.url, isMain };

    if (carId) {
      carImageObj.carId = carId;
    }

    const carImage = carImageModel({ client });
    return carImage.create(carImageObj);
  }

  function deleteCarImage(carImageId) {
    const carImage = carImageModel({ client });
    return carImage.destroy({ where: { carImageId } });
  }

  function setOwnerCarImage(arrImages) {
    const carImage = carImageModel({ client });

    // update where carImageId = $1
    arrImages.forEach((image) => {
      const { carImageId } = { ...image };
      carImage.update({ ...image }, { where: { car_image_id: carImageId } });
    });
    return {};
  }

  return Object.freeze({
    findAllModels,
    findAllCarCategories,
    findModelsByMaker,
    findAllOdometerRange,
    findAllTransmissions,
    findAllAdvanceNotice,
    findAllMinTripDurations,
    findAllMaxTripDurations,
    findAllFeaturesOpts,
    findFeatureById,
    findFeatureByCarId,
    insertCarFeatures,
    insertCarImage,
    deleteCarImage,
    setOwnerCarImage,
  });
}
