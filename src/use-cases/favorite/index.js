import makeAddFavorite from './add-favorite';
import makeListByUser from './list-by-user';

import { favoriteDb, userDb } from '../../data-access';

const addFavorite = makeAddFavorite({ favoriteDb });
const listByUser = makeListByUser({ favoriteDb, userDb });

export default {
  addFavorite,
  listByUser,
};
