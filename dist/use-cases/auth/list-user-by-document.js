Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = makeListUserByDocument;

function makeListUserByDocument({ authDb }) {
  return async function listUserByDocument({ document } = {}) {
    if (!document) throw new Error('Document is null');
    const user = await authDb.findByDocumetID(document);
    return user;
  };
}
