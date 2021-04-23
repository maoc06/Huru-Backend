export default function makeUpdatePhone({ userDb }) {
  return async function updatePhone({ phoneData } = {}) {
    const { uuid } = phoneData;

    const existing = await userDb.findByUUID(uuid);
    if (!existing) {
      throw new RangeError(`User with id ${uuid} not found`);
    }

    return userDb.updateProfile(phoneData);
  };
}
