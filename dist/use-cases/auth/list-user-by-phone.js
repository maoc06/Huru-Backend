Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = makeListUserByPhone;

function makeListUserByPhone({ authDb }) {
  return async function listUserByPhone({ phone } = {}) {
    if (!phone) throw new Error('Phone is null');
    const user = await authDb.findByPhone(phone);
    return user;
  };
}
