import CarModels from './car';
import BookingModels from './booking';
import UserModels from './user';

const { Car, Review } = CarModels;
const { Booking } = BookingModels;
const { User } = UserModels;

// Associations between modules start
Car.belongsTo(User, { as: 'userOwner', foreignKey: 'owner' });
Car.hasMany(Booking, { foreignKey: 'id' });

Booking.belongsTo(Car, { as: 'bookedCar', foreignKey: 'id' });
Booking.belongsTo(User, { as: 'bookedBy', foreignKey: 'bookingBy' });

User.hasMany(Booking, { foreignKey: 'bookingBy' });
User.hasMany(Car, { foreignKey: 'owner' });
User.hasMany(Review, { as: 'reviews', foreignKey: 'addedBy' });

Review.belongsTo(User, { as: 'reviewBy', foreignKey: 'addedBy' });
// Associations between modules end

export { CarModels, BookingModels, UserModels };
