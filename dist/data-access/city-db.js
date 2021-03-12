"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeCityDb;

var _cityModel = _interopRequireDefault(require("./models/shared/city-model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function makeCityDb({
  client
}) {
  const city = (0, _cityModel.default)({
    client
  });

  function findAll() {
    return city.findAll();
  }

  function findById(cityId) {
    return city.findByPk(cityId);
  }

  function insert({ ...cityInfo
  }) {
    return city.create({ ...cityInfo
    });
  }

  async function update({ ...cityInfo
  }) {
    const {
      cityId
    } = { ...cityInfo
    };
    const res = await city.update({ ...city
    }, {
      where: {
        city_id: cityId
      },
      returning: true,
      plain: true
    });
    return res[1].dataValues;
  }

  return Object.freeze({
    findAll,
    findById,
    insert,
    update
  });
}