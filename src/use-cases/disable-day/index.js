import makeAddDisableDay from './add-disable-day';
import makeRemoveDisableDay from './remove-disable-day';
import makeListByCar from './list-by-car';

import { disableDayDb, carDb } from '../../data-access';

const addDisableDay = makeAddDisableDay({ disableDayDb });
const removeDisableDay = makeRemoveDisableDay({ disableDayDb });
const listByCar = makeListByCar({ disableDayDb, carDb });

export default {
  addDisableDay,
  removeDisableDay,
  listByCar,
};
