import { cityUseCases } from '../../use-cases';

import makeGetCities from './get-cities';
import makePostCity from './post-city';
import makePutCity from './put-city';

const { listCities, addCity, updateCity } = cityUseCases;

const getCities = makeGetCities({ listCities });
const postCity = makePostCity({ addCity });
const putCity = makePutCity({ updateCity });

export default {
  getCities,
  postCity,
  putCity,
};
