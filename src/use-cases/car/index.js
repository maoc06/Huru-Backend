import makeAddCar from './add-car';
import makeListByUserOwner from './list-cars-by-user-owner';
import makeListByVin from './list-by-vin';
import makeListByLicensePlate from './list-by-license-plate';

import { carDb, userDb } from '../../data-access';

const addCar = makeAddCar({ carDb, userDb });
const listByUserOwner = makeListByUserOwner({ carDb, userDb });
const listByVin = makeListByVin({ carDb });
const listByLicensePlate = makeListByLicensePlate({ carDb });

export default { addCar, listByUserOwner, listByVin, listByLicensePlate };
