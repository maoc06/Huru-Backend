import { authUseCases } from '../../use-cases';

import makeSignUp from './signup';
import makeSignIn from './signin';
import makeSignUpGoogle from './signup-google';
import makeSignInGoogle from './signin-google';
import makeGetUserByEmail from './get-user-by-email';
import makeGetUserByDocument from './get-user-by-document';
import makeGetUserByPhone from './get-user-by-phone';
import makeGetSendVerificationSMS from './get-send-verification-sms';
import makeGetCheckVerifyCode from './get-check-verify-code';
import makeGetCheckEmail from './get-check-email';

const {
  authRegister,
  authLogin,
  authRegisterGoogle,
  authLoginGoogle,
  listUserByEmail,
  listUserByDocument,
  listUserByPhone,
  sendVerificationSms,
  checkVerifyCode,
  checkEmail,
} = authUseCases;

const signUp = makeSignUp({ authRegister });
const singIn = makeSignIn({ authLogin });
const signUpGoogle = makeSignUpGoogle({ authRegisterGoogle });
const signInGoogle = makeSignInGoogle({ authLoginGoogle });
const getUserByEmail = makeGetUserByEmail({ listUserByEmail });
const getUserByDocument = makeGetUserByDocument({ listUserByDocument });
const getUserByPhone = makeGetUserByPhone({ listUserByPhone });
const getSendVerificationSMS = makeGetSendVerificationSMS({
  sendVerificationSms,
});
const getCheckVerifyCode = makeGetCheckVerifyCode({
  checkVerifyCode,
});
const getCheckEmail = makeGetCheckEmail({ checkEmail });

export default {
  signUp,
  singIn,
  signUpGoogle,
  signInGoogle,
  getUserByEmail,
  getUserByDocument,
  getUserByPhone,
  getSendVerificationSMS,
  getCheckVerifyCode,
  getCheckEmail,
};
