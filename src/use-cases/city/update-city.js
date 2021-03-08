import { makeCity } from '../../entities';

export default function makeUpdateCity({ cityDb }) {
  return async function updateCity(cityInfo) {
    const city = makeCity(cityInfo);

    const existing = await cityDb.findById(city.getCityId());
    if (!existing)
      throw new RangeError(`City with id ${city.getCityId()} not found`);

    return cityDb.update(cityInfo);
  };
}
