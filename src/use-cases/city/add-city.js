import { makeCity } from '../../entities';

export default function makeAddCity({ cityDb }) {
  return async function addCity(cityInfo) {
    const city = makeCity(cityInfo);

    return cityDb.insert({
      name: city.getCityName(),
    });
  };
}
