import makeRegister from './auth-register';
import makeAuthLogin from './auth-login';
import makeAuthRegisterGoogle from './auth-register-google';
import makeAuthLoginFacebook from './auth-login-facebook';
import makeAuthLoginGoogle from './auth-login-google';
import makeListUserByEmail from './list-user-by-email';
import makeListUserByPhone from './list-user-by-phone';
import makeListUserByDocument from './list-user-by-document';
import makeSendVerificationSMS from './send-verify-sms';
import makeCheckVerifyCode from './check-verify-code';
import makeCheckEmail from './check-email';

import {
  authDb,
  userDb,
  authGoogleClient,
  verificationApi,
} from '../../data-access';
import makeHandleToken from '../../utils/handle-token';
import mailer from '../../mails';

const handleToken = makeHandleToken();
const { sendWelcomeMail } = mailer;

const authRegister = makeRegister({ authDb, handleToken, sendWelcomeMail });
const authLogin = makeAuthLogin({ authDb, handleToken });
const authRegisterGoogle = makeAuthRegisterGoogle({ authGoogleClient });
const authLoginFacebook = makeAuthLoginFacebook({ authDb, handleToken });
const authLoginGoogle = makeAuthLoginGoogle({
  authGoogleClient,
  authDb,
  handleToken,
});
const listUserByEmail = makeListUserByEmail({ authDb });
const listUserByPhone = makeListUserByPhone({ authDb });
const listUserByDocument = makeListUserByDocument({ authDb });
const sendVerificationSms = makeSendVerificationSMS({ verificationApi });
const checkVerifyCode = makeCheckVerifyCode({ verificationApi });
const checkEmail = makeCheckEmail({ userDb });

export default {
  authRegister,
  authLogin,
  authRegisterGoogle,
  authLoginFacebook,
  authLoginGoogle,
  listUserByEmail,
  listUserByDocument,
  listUserByPhone,
  sendVerificationSms,
  checkVerifyCode,
  checkEmail,
};
