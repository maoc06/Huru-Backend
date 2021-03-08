import jwt from 'jsonwebtoken';
import { config } from '../../config';

export default function makeHandleToken() {
  return function handleToken(userAuth) {
    const info = {
      uid: userAuth.uuid,
      firstName: userAuth.firstName,
      lastName: userAuth.lastName,
      email: userAuth.email,
      userType: userAuth.userType,
      createdAt: userAuth.createdAt,
      modifiedAt: userAuth.modifiedAt,
      status: userAuth.status,
      isEmailVerified: userAuth.isEmailVerified,
      isPhoneVerified: userAuth.isPhoneVerified,
    };
    return jwt.sign({ info }, config.privateKey, {
      expiresIn: '10 days',
    });
  };
}
