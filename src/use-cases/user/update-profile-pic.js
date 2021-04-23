export default function makeUpdateProfilePic({ userDb }) {
  return async function updateProfilePic({ profilePicData } = {}) {
    const { uuid } = profilePicData;

    const existing = await userDb.findByUUID(uuid);
    if (!existing) {
      throw new RangeError(`User with id ${uuid} not found`);
    }

    console.log(profilePicData);

    // return userDb.updateProfile(profilePicData);
    return {};
  };
}
