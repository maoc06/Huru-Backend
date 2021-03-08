import buildCarModel from './models/car/car-model';

export default function makeCarDb({ client }) {
  const car = buildCarModel({ client });

  function findAll() {
    return car.findAll();
  }

  function findById(carId) {
    return car.findByPk(carId);
  }

  function findByVin(vin) {
    return car.findAll({ where: { vin } });
  }

  function findByLicensePlate(licensePlate) {
    return car.findAll({ where: { licensePlate } });
  }

  function findByOwnerUUID(ownerUUID) {
    return car.findAll({ where: { ownerUUID } });
  }

  function insert({ ...carInfo }) {
    return car.create({ ...carInfo });
  }

  async function update({ ...carInfo }) {
    const { carId } = { ...carInfo };
    const res = await car.update(
      { ...carInfo },
      { where: { car_id: carId }, returning: true, plain: true }
    );
    return res[1].dataValues;
  }

  return Object.freeze({
    findAll,
    findById,
    findByVin,
    findByLicensePlate,
    findByOwnerUUID,
    insert,
    update,
  });
}
