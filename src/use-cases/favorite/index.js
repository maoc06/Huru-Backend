import makeAddFavorite from './add-favorite';
import makeListByUser from './list-by-user';
import makeRemoveFavorite from './remove-favorite';

import { favoriteDb, userDb } from '../../data-access';

const addFavorite = makeAddFavorite({ favoriteDb });
const listByUser = makeListByUser({ favoriteDb, userDb });
const removeFavorite = makeRemoveFavorite({ favoriteDb });

export default {
  addFavorite,
  listByUser,
  removeFavorite,
};
