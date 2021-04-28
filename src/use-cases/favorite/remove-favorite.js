export default function makeRemoveFavorite({ favoriteDb }) {
  return function removeFavorite({ addedBy, carId }) {
    // const favorite = makeFavorite(favoriteInfo);

    return favoriteDb.remove({ addedBy, carId });
  };
}
