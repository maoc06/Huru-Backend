import bcrypt from 'bcryptjs';
import { makeCredentials } from '../../entities';

export default function makeAuthCredentials({ authDb, handleToken }) {
  return async function authCredentials(credentials) {
    const user = makeCredentials(credentials);
    const { email, password } = user;

    const validatedUser = await validate(email);

    if (
      validatedUser.status !== undefined &&
      validatedUser.status === 'error'
    ) {
      return validatedUser;
    }

    const { password: validatedPassword } = validatedUser;

    // Validar la password
    const validPassword = await bcrypt.compare(password, validatedPassword);
    if (!validPassword)
      return { status: 'error', message: 'auth/invalid-password' };

    // SI las validaciones son ejecutadas con exito:
    // Entonces => generar el token y retornarlo
    // const userAuth = makeUser(validatedUser);
    const accessToken = handleToken(validatedUser);

    return accessToken;
  };

  async function validate(email) {
    // Verificar que el customer exista
    const existing = await authDb.findByEmail(email);
    if (existing.email === undefined)
      return { status: 'error', message: 'auth/user-not-found' };

    const user = await authDb.getInfoUser(email);

    return user[0].dataValues;
  }
}
