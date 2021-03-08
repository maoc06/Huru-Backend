import buildCityModel from './models/shared/city-model';

export default function makeCityDb({ client }) {
  const city = buildCityModel({ client });

  function findAll() {
    return city.findAll();
  }

  function findById(cityId) {
    return city.findByPk(cityId);
  }

  function insert({ ...cityInfo }) {
    return city.create({ ...cityInfo });
  }

  async function update({ ...cityInfo }) {
    const { cityId } = { ...cityInfo };
    const res = await city.update(
      { ...city },
      { where: { city_id: cityId }, returning: true, plain: true }
    );
    return res[1].dataValues;
  }

  return Object.freeze({
    findAll,
    findById,
    insert,
    update,
  });
}
