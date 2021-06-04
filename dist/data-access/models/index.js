"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "CarModels", {
  enumerable: true,
  get: function () {
    return _car.default;
  }
});
Object.defineProperty(exports, "BookingModels", {
  enumerable: true,
  get: function () {
    return _booking.default;
  }
});
Object.defineProperty(exports, "UserModels", {
  enumerable: true,
  get: function () {
    return _user.default;
  }
});
Object.defineProperty(exports, "FavoriteModels", {
  enumerable: true,
  get: function () {
    return _favorite.default;
  }
});
Object.defineProperty(exports, "OtherModels", {
  enumerable: true,
  get: function () {
    return _others.default;
  }
});
Object.defineProperty(exports, "SharedModels", {
  enumerable: true,
  get: function () {
    return _shared.default;
  }
});

var _car = _interopRequireDefault(require("./car"));

var _booking = _interopRequireDefault(require("./booking"));

var _user = _interopRequireDefault(require("./user"));

var _favorite = _interopRequireDefault(require("./favorite"));

var _others = _interopRequireDefault(require("./others"));

var _shared = _interopRequireDefault(require("./shared"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  Car,
  CarReview
} = _car.default;
const {
  Booking
} = _booking.default;
const {
  User
} = _user.default;
const {
  Favorite
} = _favorite.default;
const {
  City
} = _shared.default; // Associations between modules start

Car.belongsTo(User, {
  as: 'userOwner',
  foreignKey: 'owner'
});
Car.belongsTo(City, {
  as: 'city',
  foreignKey: 'cityId'
});
Booking.belongsTo(Car, {
  foreignKey: {
    name: 'bookingCar',
    allowNull: false
  },
  targetKey: 'carId',
  as: 'bookedCar'
});
Car.hasMany(Booking, {
  foreignKey: {
    name: 'bookingCar',
    allowNull: false
  }
});
Car.hasMany(Favorite, {
  foreignKey: {
    name: 'carId',
    allowNull: false
  }
});
Booking.belongsTo(User, {
  as: 'bookedBy',
  foreignKey: 'bookingBy'
});
User.hasMany(Booking, {
  foreignKey: 'bookingBy'
});
User.hasMany(Car, {
  foreignKey: 'owner'
});
User.hasMany(CarReview, {
  as: 'reviews',
  foreignKey: 'addedBy'
});
User.hasMany(Favorite, {
  foreignKey: {
    name: 'addedBy',
    allowNull: false
  }
});
CarReview.belongsTo(User, {
  as: 'reviewBy',
  foreignKey: 'addedBy'
});
Favorite.belongsTo(User, {
  foreignKey: {
    name: 'addedBy',
    allowNull: false
  },
  targetKey: 'uuid'
});
Favorite.belongsTo(Car, {
  foreignKey: {
    name: 'carId',
    allowNull: false
  },
  targetKey: 'carId'
});
City.hasMany(Car, {
  foreignKey: 'cityId'
}); // Associations between modules end