Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = makeAddDisableDay;

const _entities = require('../../entities');

function makeAddDisableDay({ disableDayDb }) {
  return async function addDisableDay({ disableDayInfo }) {
    const disableDay = (0, _entities.makeDisableDay)(disableDayInfo);
    return disableDayDb.insert(disableDay);
  };
}
