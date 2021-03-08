import bcrypt from 'bcryptjs';
import { makeUser } from '../../entities';

export default function makeRegister({ authDb }) {
  return async function register(userInfo) {
    await validate(userInfo);

    const user = makeUser(userInfo);

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(userInfo.password, salt);

    const userTmp = { ...user };
    userTmp.password = hashPassword;

    return authDb.insert(userTmp);
  };

  async function validate(user) {
    const { email, phone, identityDocument } = user;

    // Verificar que el email no este registrado
    let existing = await authDb.findByEmail(email);
    if (existing.email !== undefined)
      throw new Error('auth/user-email-already-exists');

    // // Verificar que el numero de telefono que se intenta agregar no exista
    existing = await authDb.findByPhone(phone);
    if (existing.phone !== undefined)
      throw new Error('auth/user-phone-already-exists');

    // // Verificar que el numero de documento de identidad que se intenta agregar no exista
    existing = await authDb.findByDocumetID(identityDocument);
    if (existing.document_id)
      throw new Error('auth/user-document-already-exists');
  }
}
