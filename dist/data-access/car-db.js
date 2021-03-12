"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeCarDb;

var _carModel = _interopRequireDefault(require("./models/car/car-model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function makeCarDb({
  client
}) {
  const car = (0, _carModel.default)({
    client
  });

  function findAll() {
    return car.findAll();
  }

  function findById(carId) {
    return car.findByPk(carId);
  }

  function findByVin(vin) {
    return car.findAll({
      where: {
        vin
      }
    });
  }

  function findByLicensePlate(licensePlate) {
    return car.findAll({
      where: {
        licensePlate
      }
    });
  }

  function findByOwnerUUID(ownerUUID) {
    return car.findAll({
      where: {
        ownerUUID
      }
    });
  }

  function insert({ ...carInfo
  }) {
    return car.create({ ...carInfo
    });
  }

  async function update({ ...carInfo
  }) {
    const {
      carId
    } = { ...carInfo
    };
    const res = await car.update({ ...carInfo
    }, {
      where: {
        car_id: carId
      },
      returning: true,
      plain: true
    });
    return res[1].dataValues;
  }

  return Object.freeze({
    findAll,
    findById,
    findByVin,
    findByLicensePlate,
    findByOwnerUUID,
    insert,
    update
  });
}