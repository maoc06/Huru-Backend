Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = makeListUser;

function makeListUser({ userDb }) {
  return async function listUser({ uuid } = {}) {
    if (!uuid) throw new Error(`User with id ${uuid} does not exist`);
    const user = await userDb.findByUUID(uuid);
    return user;
  };
}
