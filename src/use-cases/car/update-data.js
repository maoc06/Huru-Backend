export default function makeUpdateData({ carDb }) {
  return async function updateData(data) {
    const { carId } = data;

    const existing = await carDb.findByIdSimple(carId);
    if (!existing) {
      throw new RangeError(`Car with id ${carId} not found`);
    }

    return carDb.update(data);
  };
}
