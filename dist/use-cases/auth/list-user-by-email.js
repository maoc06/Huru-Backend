Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = makeListUserByEmail;

function makeListUserByEmail({ authDb }) {
  return async function listUserByEmail({ email } = {}) {
    if (!email) throw new Error('Email is null');
    const user = await authDb.findByEmail(email);
    return user;
  };
}
