import { makeDisableDay } from '../../entities';

export default function makeAddDisableDay({ disableDayDb }) {
  return async function addDisableDay({ disableDayInfo }) {
    const disableDay = makeDisableDay(disableDayInfo);
    return disableDayDb.insert(disableDay);
  };
}
