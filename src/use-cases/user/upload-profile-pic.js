export default function makeUploadProfilePic({ userDb }) {
  return function uploadProfilePic(profilePicData) {
    return userDb.insertProfileImage(profilePicData);
  };
}
