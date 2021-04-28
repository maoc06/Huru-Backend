import { favoriteUseCases } from '../../use-cases';

import makePostFavorite from './post-favorite';
import makeGetByUser from './get-by-user';
import makeDeleteFavorite from './delete-favorite';

const { addFavorite, listByUser, removeFavorite } = favoriteUseCases;

const postFavorite = makePostFavorite({ addFavorite });
const getByUser = makeGetByUser({ listByUser });
const deleteFavorite = makeDeleteFavorite({ removeFavorite });

export default {
  postFavorite,
  getByUser,
  deleteFavorite,
};
