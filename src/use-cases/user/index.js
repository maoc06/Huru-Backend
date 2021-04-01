import makeListUser from './list-user';

import { userDb } from '../../data-access';

const listUser = makeListUser({ userDb });

export default {
  listUser,
};
