export default function makeUpdateStatus({ userDb }) {
  return async function updateStatus(data) {
    const { uuid } = data;

    const existing = await userDb.findByUUID(uuid);
    if (!existing) {
      throw new RangeError(`User with id ${uuid} not found`);
    }

    return userDb.updateProfile(data);
  };
}
