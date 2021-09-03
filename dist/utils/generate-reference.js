Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = generateReference;

const _crypto = _interopRequireDefault(require('crypto'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function generateReference() {
  return _crypto.default.randomBytes(8).toString('hex');
}
