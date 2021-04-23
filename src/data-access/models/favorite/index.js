import client from '../../client';

import buildFavoriteModel from './favorite-model';

const Favorite = buildFavoriteModel(client);

export default { Favorite };
