import bcrypt from 'bcryptjs';

export default function makeUpdatePassword({ userDb }) {
  return async function updatePassword({ passwordData } = {}) {
    const { uuid, currPassword, newPassword } = passwordData;

    const existing = await userDb.findByUUID(uuid);
    if (!existing) {
      throw new RangeError(`User with id ${uuid} not found`);
    }

    console.log(existing);

    const {
      dataValues: { password: passwordDb },
    } = existing;

    // Validar la password
    const validPassword = await bcrypt.compare(currPassword, passwordDb);
    if (!validPassword) throw new Error('auth/invalid-password');

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashNewPassword = await bcrypt.hash(newPassword, salt);

    const updateData = { uuid, password: hashNewPassword };

    return userDb.updateProfile(updateData);
  };
}
