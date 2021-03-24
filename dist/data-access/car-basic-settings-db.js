'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = makeCarBasicSettingsDb;

var _car = require('./models/car');

var _uploadFileS = _interopRequireDefault(require('../utils/upload-file-s3'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function makeCarBasicSettingsDb({ client }) {
  function findAllModels() {
    const car = (0, _car.carModel)({
      client,
    });
    return car.findAll();
  }

  function findModelsByMaker(makerId) {
    const car = (0, _car.carModel)({
      client,
    });
    return car.findAll({
      where: {
        makerId,
      },
    });
  }

  function findAllOdometerRange() {
    const odometer = (0, _car.odometerRangeModel)({
      client,
    });
    return odometer.findAll();
  }

  function findAllTransmissions() {
    const transmission = (0, _car.trasmissionModel)({
      client,
    });
    return transmission.findAll();
  }

  function findAllAdvanceNotice() {
    const advanceNotice = (0, _car.advanceNoticeModel)({
      client,
    });
    return advanceNotice.findAll();
  }

  function findAllMinTripDurations() {
    const minTrip = (0, _car.minTripModel)({
      client,
    });
    return minTrip.findAll();
  }

  function findAllMaxTripDurations() {
    const maxTrip = (0, _car.maxTripModel)({
      client,
    });
    return maxTrip.findAll();
  }

  function findAllFeaturesOpts() {
    const features = (0, _car.featureOptsModel)({
      client,
    });
    return features.findAll();
  }

  function findFeatureById(featureId) {
    const feature = (0, _car.featureOptsModel)({
      client,
    });
    return feature.findAll({
      where: {
        featureId,
      },
    });
  }

  function findFeatureByCarId(carId) {
    const carFetures = (0, _car.carFeatureModel)({
      client,
    });
    return carFetures.findAll({
      where: {
        carId,
      },
    });
  }

  function insertCarFeatures(selectedFeatures) {
    const carFetures = (0, _car.carFeatureModel)({
      client,
    });
    return carFetures.bulkCreate(selectedFeatures);
  }

  async function insertCarImage(imageInfo) {
    const { photoFile, uid } = imageInfo;
    const s3 = await (0, _uploadFileS.default)(photoFile);
    if (!s3.success) throw new Error('Error uploading the image');
    const carImageObj = {
      addedBy: uid,
      imagePath: s3.url,
    };
    const carImage = (0, _car.carImageModel)({
      client,
    });
    return carImage.create(carImageObj);
  }

  function setOwnerCarImage(arrImages) {
    const carImage = (0, _car.carImageModel)({
      client,
    }); // update where carImageId = $1

    arrImages.forEach((image) => {
      const { carImageId } = { ...image };
      carImage.update(
        { ...image },
        {
          where: {
            car_image_id: carImageId,
          },
        }
      );
    });
    return {};
  }

  return Object.freeze({
    findAllModels,
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
