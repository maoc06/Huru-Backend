import { deletFileS3 } from '../../utils/actions-s3';

export default function makeUpdateProfilePic({ userDb }) {
  return async function updateProfilePic(profilePicData) {
    const { uid, originalUrl } = profilePicData;

    const existing = await userDb.findByUUID(uid);
    if (!existing) {
      throw new RangeError(`User with id ${uid} not found`);
    }

    const newPicUrl = await userDb.insertProfileImage(profilePicData);
    const updateData = { uuid: uid, profilePhoto: newPicUrl };
    await userDb.updateProfile(updateData);

    if (originalUrl !== '/') {
      // remove image from bucket
      const key = originalUrl.substring(
        originalUrl.lastIndexOf('/') + 1,
        originalUrl.length
      );

      deletFileS3({ key });
    }

    return newPicUrl;
  };
}
