Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = makeListByUser;

function makeListByUser({ favoriteDb, userDb }) {
  return async function listByUser({ userId } = {}) {
    if (!userId) throw new Error('User id null');
    const existing = await userDb.findByUUID(userId);
    if (!existing) throw new Error('User not found');
    const favorites = await favoriteDb.findByUser(userId);
    return favorites;
  };
}
