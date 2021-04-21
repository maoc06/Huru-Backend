export default function makeUpdateFeatures({ carDb }) {
  return async function updateFeatures({ data } = {}) {
    const bulkFeatures = [];
    const { carId, features } = data;

    await carDb.deleteFeatures(carId);

    features.forEach((feature) => {
      bulkFeatures.push({ carId, featureId: feature });
    });

    return carDb.insertFeatures(bulkFeatures);
  };
}
