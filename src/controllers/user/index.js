import { userUseCases } from '../../use-cases';

import makeGetUser from './get-user';

const { listUser } = userUseCases;

const getUser = makeGetUser({ listUser });

export default {
  getUser,
};
