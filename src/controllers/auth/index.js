import { authUseCases } from '../../use-cases';

import makeSignUp from './signup';
import makeSignIn from './signin';
import makeGetUserByEmail from './get-user-by-email';
import makeGetUserByDocument from './get-user-by-document';
import makeGetUserByPhone from './get-user-by-phone';
import makeGetSendVerificationSMS from './get-send-verification-sms';
import makeGetCheckVerifyCode from './get-check-verify-code';

const {
  authRegister,
  authLogin,
  listUserByEmail,
  listUserByDocument,
  listUserByPhone,
  sendVerificationSms,
  checkVerifyCode,
} = authUseCases;

const signUp = makeSignUp({ authRegister });
const singIn = makeSignIn({ authLogin });
const getUserByEmail = makeGetUserByEmail({ listUserByEmail });
const getUserByDocument = makeGetUserByDocument({ listUserByDocument });
const getUserByPhone = makeGetUserByPhone({ listUserByPhone });
const getSendVerificationSMS = makeGetSendVerificationSMS({
  sendVerificationSms,
});
const getCheckVerifyCode = makeGetCheckVerifyCode({
  checkVerifyCode,
});

export default {
  signUp,
  singIn,
  getUserByEmail,
  getUserByDocument,
  getUserByPhone,
  getSendVerificationSMS,
  getCheckVerifyCode,
};
