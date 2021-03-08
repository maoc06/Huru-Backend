import { carUseCases } from '../../use-cases';

import makePostCity from './post-car';
import makeGetCarByUserOwner from './get-car-by-user-owner';
import makeGetCarByVin from './get-car-by-vin';
import makeGetCarByLicensePlate from './get-car-by-license-plate';

const { addCar, listByUserOwner, listByVin, listByLicensePlate } = carUseCases;

const postCar = makePostCity({ addCar });
const getCarByUserOwner = makeGetCarByUserOwner({ listByUserOwner });
const getCarByVin = makeGetCarByVin({ listByVin });
const getCarByLicensePlate = makeGetCarByLicensePlate({ listByLicensePlate });

export default {
  postCar,
  getCarByUserOwner,
  getCarByVin,
  getCarByLicensePlate,
};
