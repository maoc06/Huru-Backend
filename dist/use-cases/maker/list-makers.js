Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = makeListMakers;

function makeListMakers({ makerDb }) {
  return async function listMakers({ makerId } = {}) {
    if (makerId) {
      const maker = await makerDb.findById(makerId);
      if (!maker) throw new Error(`Maker with id ${makerId} not found`);
      return maker;
    }

    const makers = await makerDb.findAll();
    return makers;
  };
}
