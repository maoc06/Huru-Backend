Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = makeMakerDb;

const _makerModel = _interopRequireDefault(require('./models/car/maker-model'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function makeMakerDb({ client }) {
  const maker = (0, _makerModel.default)({
    client,
  });

  function findAll() {
    return maker.findAll();
  }

  function findById(makerId) {
    return maker.findByPk(makerId);
  }

  return Object.freeze({
    findAll,
    findById,
  });
}
