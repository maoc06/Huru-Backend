import jwt from 'jsonwebtoken';
import { config } from '../../../config';

export default function makeCheckEmail({ userDb }) {
  return async function checkEmail(token) {
    if (!token) throw new Error('Token null');

    try {
      const res = jwt.verify(token, config.emailPrivateKey);
      return await userDb.updateEmailVerification(res.info.email, true);
    } catch (error) {
      throw new Error('Verify-email-token-not-valid');
    }
  };
}
