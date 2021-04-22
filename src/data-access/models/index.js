import CarModels from './car';
import BookingModels from './booking';
import UserModels from './user';

const { Car, CarReview } = CarModels;
const { Booking } = BookingModels;
const { User } = UserModels;

// Associations between modules start
Car.belongsTo(User, { as: 'userOwner', foreignKey: 'owner' });

Booking.belongsTo(Car, {
  foreignKey: { name: 'bookingCar', allowNull: false },
  targetKey: 'carId',
  as: 'bookedCar',
});

Car.hasMany(Booking, {
  foreignKey: { name: 'bookingCar', allowNull: false },
});

Booking.belongsTo(User, { as: 'bookedBy', foreignKey: 'bookingBy' });

User.hasMany(Booking, { foreignKey: 'bookingBy' });
User.hasMany(Car, { foreignKey: 'owner' });
User.hasMany(CarReview, { as: 'reviews', foreignKey: 'addedBy' });

CarReview.belongsTo(User, { as: 'reviewBy', foreignKey: 'addedBy' });
// Associations between modules end

export { CarModels, BookingModels, UserModels };
