Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = makeUpdatePhone;

function makeUpdatePhone({ userDb }) {
  return async function updatePhone({ phoneData } = {}) {
    const { uuid } = phoneData;
    const existing = await userDb.findByUUID(uuid);

    if (!existing) {
      throw new RangeError(`User with id ${uuid} not found`);
    }

    const updateData = { ...phoneData };
    updateData.isPhoneVerified = false;
    return userDb.updateProfile(updateData);
  };
}
