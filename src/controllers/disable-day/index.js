import { disableDayUseCases } from '../../use-cases';

import makePostDisableDay from './post-disable-day';
import makeDeleteDisableDay from './delete-disable-day';
import makeGetByCar from './get-by-car';

const { addDisableDay, removeDisableDay, listByCar } = disableDayUseCases;

const postDisableDay = makePostDisableDay({ addDisableDay });
const deleteDisableDay = makeDeleteDisableDay({ removeDisableDay });
const getByCar = makeGetByCar({ listByCar });

export default {
  postDisableDay,
  deleteDisableDay,
  getByCar,
};
