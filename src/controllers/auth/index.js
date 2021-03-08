import { authUseCases } from '../../use-cases';

import makeSignUp from './signup';
import makeSignIn from './signin';
import makeGetUserByEmail from './get-user-by-email';
import makeGetUserByDocument from './get-user-by-document';
import makeGetUserByPhone from './get-user-by-phone';

const {
  authRegister,
  authLogin,
  listUserByEmail,
  listUserByDocument,
  listUserByPhone,
} = authUseCases;

const signUp = makeSignUp({ authRegister });
const singIn = makeSignIn({ authLogin });
const getUserByEmail = makeGetUserByEmail({ listUserByEmail });
const getUserByDocument = makeGetUserByDocument({ listUserByDocument });
const getUserByPhone = makeGetUserByPhone({ listUserByPhone });

export default {
  signUp,
  singIn,
  getUserByEmail,
  getUserByDocument,
  getUserByPhone,
};
