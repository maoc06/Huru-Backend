import CarModels from './car';
import BookingModels from './booking';
import UserModels from './user';
import FavoriteModels from './favorite';
import OtherModels from './others';
import SharedModels from './shared';

const { Car, CarReview } = CarModels;
const { Booking } = BookingModels;
const { User } = UserModels;
const { Favorite } = FavoriteModels;
const { City } = SharedModels;

// Associations between modules start
Car.belongsTo(User, { as: 'userOwner', foreignKey: 'owner' });
Car.belongsTo(City, { as: 'city', foreignKey: 'cityId' });

Booking.belongsTo(Car, {
  foreignKey: { name: 'bookingCar', allowNull: false },
  targetKey: 'carId',
  as: 'bookedCar',
});

Car.hasMany(Booking, {
  foreignKey: { name: 'bookingCar', allowNull: false },
});
Car.hasMany(Favorite, {
  foreignKey: { name: 'carId', allowNull: false },
});

Booking.belongsTo(User, { as: 'bookedBy', foreignKey: 'bookingBy' });

User.hasMany(Booking, { foreignKey: 'bookingBy' });
User.hasMany(Car, { foreignKey: 'owner' });
User.hasMany(CarReview, { as: 'reviews', foreignKey: 'addedBy' });
User.hasMany(Favorite, {
  foreignKey: { name: 'addedBy', allowNull: false },
});

CarReview.belongsTo(User, { as: 'reviewBy', foreignKey: 'addedBy' });

Favorite.belongsTo(User, {
  foreignKey: { name: 'addedBy', allowNull: false },
  targetKey: 'uuid',
});
Favorite.belongsTo(Car, {
  foreignKey: { name: 'carId', allowNull: false },
  targetKey: 'carId',
});

City.hasMany(Car, { foreignKey: 'cityId' });
// Associations between modules end

export {
  CarModels,
  BookingModels,
  UserModels,
  FavoriteModels,
  OtherModels,
  SharedModels,
};
