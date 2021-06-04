"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeUpdateFeatures;

function makeUpdateFeatures({
  carDb
}) {
  return async function updateFeatures({
    data
  } = {}) {
    const bulkFeatures = [];
    const {
      carId,
      features
    } = data;
    await carDb.deleteFeatures(carId);
    features.forEach(feature => {
      bulkFeatures.push({
        carId,
        featureId: feature
      });
    });
    return carDb.insertFeatures(bulkFeatures);
  };
}