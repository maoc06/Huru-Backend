export default function makeUpdateData({ userDb }) {
  return async function updateData(data) {
    const { uuid } = data;

    const existing = await userDb.findByUUID(uuid);
    if (!existing) {
      throw new RangeError(`User with id ${uuid} not found`);
    }

    return userDb.updateProfile(data);
  };
}
