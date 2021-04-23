import { favoriteUseCases } from '../../use-cases';

import makePostFavorite from './post-favorite';
import makeGetByUser from './get-by-user';

const { addFavorite, listByUser } = favoriteUseCases;

const postFavorite = makePostFavorite({ addFavorite });
const getByUser = makeGetByUser({ listByUser });

export default {
  postFavorite,
  getByUser,
};
