import { DateTime } from 'luxon';

import { makeDisableDay } from '../../entities';

export default function makeRemoveDisableDay({ disableDayDb }) {
  return async function removeDisableDay(disableDayInfo) {
    const data = makeDisableDay(disableDayInfo);

    const dateSplitted = data.disableDay.split('-');
    const year = parseInt(dateSplitted[0], 10);
    const month = parseInt(dateSplitted[1], 10);
    const day = parseInt(dateSplitted[2], 10);

    const date = DateTime.utc(year, month, day).toISODate();

    return disableDayDb.deleteDay({ carId: data.carId, disableDay: date });
  };
}
