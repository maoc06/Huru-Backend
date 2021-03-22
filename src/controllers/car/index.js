import { carUseCases } from '../../use-cases';

import makePostCity from './post-car';
import makeGetCar from './get-car';
import makeGetCarByUserOwner from './get-car-by-user-owner';
import makeGetCarByVin from './get-car-by-vin';
import makeGetCarByLicensePlate from './get-car-by-license-plate';
import makeGetCarsByCity from './get-cars-by-city';

const {
  addCar,
  listCar,
  listByUserOwner,
  listByVin,
  listByLicensePlate,
  listCarsByCity,
} = carUseCases;

const postCar = makePostCity({ addCar });
const getCar = makeGetCar({ listCar });
const getCarByUserOwner = makeGetCarByUserOwner({ listByUserOwner });
const getCarByVin = makeGetCarByVin({ listByVin });
const getCarByLicensePlate = makeGetCarByLicensePlate({ listByLicensePlate });
const getCarsByCity = makeGetCarsByCity({ listCarsByCity });

export default {
  postCar,
  getCar,
  getCarByUserOwner,
  getCarByVin,
  getCarByLicensePlate,
  getCarsByCity,
};
