import { makeFavorite } from '../../entities';

export default function makeAddFavorite({ favoriteDb }) {
  return function addFavorite(favoriteInfo) {
    const favorite = makeFavorite(favoriteInfo);

    return favoriteDb.insert(favorite);
  };
}
