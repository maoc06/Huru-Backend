export default function makeListCar({ carDb }) {
  return async function listCar({ carId } = {}) {
    if (!carId) throw new Error('Car ID null');

    const existing = await carDb.findById(carId);
    if (existing.length === 0)
      throw new Error(`car with id ${carId} does not exist`);

    return existing;
  };
}
