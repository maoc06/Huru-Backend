import { carUseCases } from '../../use-cases';

import makePostCity from './post-car';
import makeGetCar from './get-car';
import makeGetCarByUserOwner from './get-car-by-user-owner';
import makeGetCarByVin from './get-car-by-vin';
import makeGetCarByLicensePlate from './get-car-by-license-plate';
import makeGetCarsByCity from './get-cars-by-city';
import makeGetFeaturesByCar from './get-features-by-car';
import makePatchVisibility from './patch-visibility';
import makePatchDisable from './patch-disable';
import makePatchBookingTerms from './patch-booking-terms';
import makePutFeatures from './put-features';

const {
  addCar,
  listCar,
  listByUserOwner,
  listByVin,
  listByLicensePlate,
  listCarsByCity,
  listFeaturesByCar,
  updateVisibility,
  updateDisable,
  updateBookingTerms,
  updateFeatures,
} = carUseCases;

const postCar = makePostCity({ addCar });
const getCar = makeGetCar({ listCar });
const getCarByUserOwner = makeGetCarByUserOwner({ listByUserOwner });
const getCarByVin = makeGetCarByVin({ listByVin });
const getCarByLicensePlate = makeGetCarByLicensePlate({ listByLicensePlate });
const getCarsByCity = makeGetCarsByCity({ listCarsByCity });
const getFeaturesByCar = makeGetFeaturesByCar({ listFeaturesByCar });
const patchVisibility = makePatchVisibility({ updateVisibility });
const patchDisable = makePatchDisable({ updateDisable });
const patchBookingTerms = makePatchBookingTerms({ updateBookingTerms });
const putFeatures = makePutFeatures({ updateFeatures });

export default {
  postCar,
  getCar,
  getCarByUserOwner,
  getCarByVin,
  getCarByLicensePlate,
  getCarsByCity,
  getFeaturesByCar,
  patchVisibility,
  patchDisable,
  patchBookingTerms,
  putFeatures,
};
