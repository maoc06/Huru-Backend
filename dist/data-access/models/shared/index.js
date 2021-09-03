Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = void 0;

const _client = _interopRequireDefault(require('../../client'));

const _cityModel = _interopRequireDefault(require('./city-model'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const City = (0, _cityModel.default)(_client.default);
const _default = {
  City,
};
exports.default = _default;
