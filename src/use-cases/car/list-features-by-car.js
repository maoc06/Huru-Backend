export default function makeListFeaturesByCar({ carDb }) {
  return async function listFeaturesByCar({ carId } = {}) {
    if (!carId) throw new Error('Car id null');

    const existing = await carDb.findByIdSimple(carId);
    if (!existing) throw new Error('Car not found');

    const features = await carDb.findCarFeatures(carId);
    return features;
  };
}
