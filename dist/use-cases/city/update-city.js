Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = makeUpdateCity;

const _entities = require('../../entities');

function makeUpdateCity({ cityDb }) {
  return async function updateCity(cityInfo) {
    const city = (0, _entities.makeCity)(cityInfo);
    const existing = await cityDb.findById(city.getCityId());
    if (!existing)
      throw new RangeError(`City with id ${city.getCityId()} not found`);
    return cityDb.update(cityInfo);
  };
}
