export default function makeDestroyUser({ userDb }) {
  return async function destroyUser({ email }) {
    const existing = await userDb.findByEmail(email);
    if (!existing) throw new Error('user not found');

    return userDb.deleteUser(email);
  };
}
