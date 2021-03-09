import makeRegister from './auth-register';
import makeAuthLogin from './auth-login';
import makeListUserByEmail from './list-user-by-email';
import makeListUserByPhone from './list-user-by-phone';
import makeListUserByDocument from './list-user-by-document';
import makeSendVerificationSMS from './send-verify-sms';
import makeCheckVerifyCode from './check-verify-code';

import { authDb, verificationApi } from '../../data-access';
import makeHandleToken from '../../utils/handle-token';

const handleToken = makeHandleToken();

const authRegister = makeRegister({ authDb });
const authLogin = makeAuthLogin({ authDb, handleToken });
const listUserByEmail = makeListUserByEmail({ authDb });
const listUserByPhone = makeListUserByPhone({ authDb });
const listUserByDocument = makeListUserByDocument({ authDb });
const sendVerificationSms = makeSendVerificationSMS({ verificationApi });
const checkVerifyCode = makeCheckVerifyCode({ verificationApi });

export default {
  authRegister,
  authLogin,
  listUserByEmail,
  listUserByDocument,
  listUserByPhone,
  sendVerificationSms,
  checkVerifyCode,
};
