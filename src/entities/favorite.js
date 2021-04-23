export default function buildMakeFavorite() {
  return function makeFavorite({ ...entity }) {
    const { addedBy, carId } = { ...entity };

    if (!addedBy) throw new Error('Favorite must be assigned to a user');
    if (!carId) throw new Error('The favorite must be belong to a car');

    const favorite = Object.freeze({ ...entity });

    return favorite;
  };
}
