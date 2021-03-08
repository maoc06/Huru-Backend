import buildMakerModel from './models/car/maker-model';

export default function makeMakerDb({ client }) {
  const maker = buildMakerModel({ client });

  function findAll() {
    return maker.findAll();
  }

  function findById(makerId) {
    return maker.findByPk(makerId);
  }

  return Object.freeze({
    findAll,
    findById,
  });
}
