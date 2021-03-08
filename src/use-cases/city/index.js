import makeListCities from './list-cities';
import makeAddCity from './add-city';
import makeUpdateCity from './update-city';

import { cityDb } from '../../data-access';

const listCities = makeListCities({ cityDb });
const addCity = makeAddCity({ cityDb });
const updateCity = makeUpdateCity({ cityDb });

export default {
  listCities,
  addCity,
  updateCity,
};
