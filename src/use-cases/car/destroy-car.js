export default function makeDestroyCar({ carDb }) {
  return async function destroyCar({ carId }) {
    const existing = await carDb.findByIdSimple(carId);
    if (!existing) throw new Error('Car not found');

    return carDb.deleteCar(carId);
  };
}
