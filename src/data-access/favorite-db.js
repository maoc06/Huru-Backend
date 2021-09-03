import { CarModels, FavoriteModels } from './models';

const { Favorite } = FavoriteModels;
const { Car, Image, Maker, Model } = CarModels;

export default function makeFavoriteDb() {
  function findByUser(userId) {
    return Favorite.findAll({
      attributes: { exclude: ['carId'] },
      where: { addedBy: userId },
      include: {
        model: Car,
        attributes: ['carId', 'year'],
        include: [
          {
            model: Image,
            as: 'images',
            where: { isMain: true },
            required: false,
          },
          { model: Model, attributes: ['modelId', 'name'] },
          { model: Maker },
        ],
      },
    });
  }

  function insert(favorite) {
    return Favorite.create(favorite);
  }

  function remove({ addedBy, carId }) {
    return Favorite.destroy({ where: { addedBy, carId } });
  }

  return Object.freeze({
    findByUser,
    insert,
    remove,
  });
}
