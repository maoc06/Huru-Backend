import {
  carModel,
  categoryModel,
  odometerRangeModel,
  trasmissionModel,
  advanceNoticeModel,
  minTripModel,
  maxTripModel,
  featureOptsModel,
  carFeatureModel,
  carImageModel,
} from './models/car';
import uploadFileS3 from '../utils/upload-file-s3';

export default function makeCarBasicSettingsDb({ client }) {
  function findAllModels() {
    const car = carModel({ client });
    return car.findAll();
  }

  function findAllCarCategories() {
    const category = categoryModel({ client });
    return category.findAll();
  }

  function findModelsByMaker(makerId) {
    const car = carModel({ client });
    return car.findAll({ where: { makerId } });
  }

  function findAllOdometerRange() {
    const odometer = odometerRangeModel({ client });
    return odometer.findAll();
  }

  function findAllTransmissions() {
    const transmission = trasmissionModel({ client });
    return transmission.findAll();
  }

  function findAllAdvanceNotice() {
    const advanceNotice = advanceNoticeModel({ client });
    return advanceNotice.findAll();
  }

  function findAllMinTripDurations() {
    const minTrip = minTripModel({ client });
    return minTrip.findAll();
  }

  function findAllMaxTripDurations() {
    const maxTrip = maxTripModel({ client });
    return maxTrip.findAll();
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
    const { photoFile, uid } = imageInfo;

    const s3 = await uploadFileS3(photoFile);

    if (!s3.success) throw new Error('Error uploading the image');

    const carImageObj = { addedBy: uid, imagePath: s3.url };

    const carImage = carImageModel({ client });
    return carImage.create(carImageObj);
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
    setOwnerCarImage,
  });
}
