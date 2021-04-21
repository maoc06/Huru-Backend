const CAR_VISIBLE_ID = 1;
const CAR_HIDDEN_ID = 3;

export default function makeUpdateVisibility({ carDb }) {
  return async function updateVisibility({ carData } = {}) {
    const { carId } = carData;
    const dataUpdate = { carId, status: CAR_VISIBLE_ID };

    const existing = await carDb.findById(carId);
    if (!existing) {
      throw new RangeError(`Car with id ${carId} not found`);
    }

    const { status } = existing.dataValues;

    switch (status) {
      case CAR_VISIBLE_ID:
        dataUpdate.status = CAR_HIDDEN_ID;
        break;
      case CAR_HIDDEN_ID:
        dataUpdate.status = CAR_VISIBLE_ID;
        break;
      default:
        dataUpdate.status = CAR_VISIBLE_ID;
        break;
    }

    return carDb.update(dataUpdate);
  };
}
