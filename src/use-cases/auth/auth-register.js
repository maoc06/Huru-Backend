import bcrypt from 'bcryptjs';
import { makeUser } from '../../entities';
import { config } from '../../../config';

const DISABLE_STATUS_ID = 2;

export default function makeRegister({ authDb, handleToken, sendWelcomeMail }) {
  return async function register(userInfo) {
    await validate(userInfo);

    const user = makeUser(userInfo);
    const userTmp = { ...user };

    // Hash password
    if (userInfo.password) {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(userInfo.password, salt);

      userTmp.password = hashPassword;
    }

    const verifyEmailToken = handleToken(
      { email: userTmp.email },
      config.emailPrivateKey,
      '1d'
    );

    sendWelcomeMail({
      emailToSend: userTmp.email,
      firstname: userTmp.firstName,
      url: `https://${config.webAppServerBaseUrl}/verify-email/${verifyEmailToken}`,
    });

    if (userTmp.phone) {
      userTmp.phone = `+${userTmp.phone.replace(/\D/g, '')}`;
    }

    await authDb.insert({ ...userTmp, status: DISABLE_STATUS_ID });

    const accessToken = initialAccessToken(userTmp.email);

    return accessToken;
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

  async function initialAccessToken(email) {
    const { dataValues: user } = await authDb.getInfoUser(email);

    const info = {
      uid: user.uuid,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      userType: user.userType,
      profilePicture: user.profilePhoto,
      phone: user.phone,
      createdAt: user.createdAt,
      modifiedAt: user.modifiedAt,
      status: user.status,
      identityDocument: user.identityDocument,
      dateOfBirth: user.dateOfBirth,
      isEmailVerified: user.isEmailVerified,
      isPhoneVerified: user.isPhoneVerified,
    };

    return handleToken(info, config.privateKey);
  }
}
