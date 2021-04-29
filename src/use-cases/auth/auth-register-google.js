import { config } from '../../../config';

export default function makeAuthRegisterGoogle({ authGoogleClient }) {
  return async function authRegisterGoogle({ token }) {
    const ticket = await authGoogleClient.verifyIdToken({
      idToken: token,
      audience: config.googleClientId,
    });

    const googleAccount = ticket.getPayload();

    const user = {
      email: googleAccount.email,
      profilePhoto: googleAccount.picture,
      firstName: googleAccount.given_name,
      lastName: googleAccount.family_name,
    };

    return user;
  };
}
