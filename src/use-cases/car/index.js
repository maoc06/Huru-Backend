import makeAddCar from './add-car';
import makeListCar from './list-car';
import makeListByUserOwner from './list-cars-by-user-owner';
import makeListByVin from './list-by-vin';
import makeListByLicensePlate from './list-by-license-plate';
import makeListCarsByCity from './list-cars-by-city';
import makeUpdateVisibility from './update-visibility';
import makeUpdateDisable from './update-disable';
import makeUpdateBookingTerms from './update-booking-terms';
import makeUpdateFeatures from './update-features';

import { carDb, userDb } from '../../data-access';

const addCar = makeAddCar({ carDb, userDb });
const listCar = makeListCar({ carDb });
const listByUserOwner = makeListByUserOwner({ carDb, userDb });
const listByVin = makeListByVin({ carDb });
const listByLicensePlate = makeListByLicensePlate({ carDb });
const listCarsByCity = makeListCarsByCity({ carDb });
const updateVisibility = makeUpdateVisibility({ carDb });
const updateDisable = makeUpdateDisable({ carDb });
const updateBookingTerms = makeUpdateBookingTerms({ carDb });
const updateFeatures = makeUpdateFeatures({ carDb });

export default {
  addCar,
  listCar,
  listByUserOwner,
  listByVin,
  listByLicensePlate,
  listCarsByCity,
  updateVisibility,
  updateDisable,
  updateBookingTerms,
  updateFeatures,
};
