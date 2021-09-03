Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = void 0;

const _client = _interopRequireDefault(require('../../client'));

const _disableDayModel = _interopRequireDefault(require('./disable-day-model'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const DisableDay = (0, _disableDayModel.default)(_client.default);
const _default = {
  DisableDay,
};
exports.default = _default;
