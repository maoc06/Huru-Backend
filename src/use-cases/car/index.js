import makeAddCar from './add-car';
import makeListCar from './list-car';
import makeListByUserOwner from './list-cars-by-user-owner';
import makeListByVin from './list-by-vin';
import makeListByLicensePlate from './list-by-license-plate';
import makeListCarsByCity from './list-cars-by-city';

import { carDb, userDb } from '../../data-access';

const addCar = makeAddCar({ carDb, userDb });
const listCar = makeListCar({ carDb });
const listByUserOwner = makeListByUserOwner({ carDb, userDb });
const listByVin = makeListByVin({ carDb });
const listByLicensePlate = makeListByLicensePlate({ carDb });
const listCarsByCity = makeListCarsByCity({ carDb });

export default {
  addCar,
  listCar,
  listByUserOwner,
  listByVin,
  listByLicensePlate,
  listCarsByCity,
};
