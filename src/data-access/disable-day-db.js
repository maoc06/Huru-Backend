import { OtherModels } from './models';

const { DisableDay } = OtherModels;

export default function makeDisableDayDb() {
  function findAll() {
    return DisableDay.findAll();
  }

  function findById(disableDayId) {
    return DisableDay.findByPk(disableDayId);
  }

  function findByCar(carId) {
    return DisableDay.findAll({ where: { carId } });
  }

  function insert({ ...disableDayInfo }) {
    return DisableDay.create({ ...disableDayInfo });
  }

  function deleteDay({ carId, disableDay }) {
    return DisableDay.destroy({ where: { carId, disableDay } });
  }

  return Object.freeze({
    findAll,
    findById,
    findByCar,
    insert,
    deleteDay,
  });
}
