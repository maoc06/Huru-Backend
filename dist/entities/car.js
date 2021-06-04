"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = buildMakeCar;

var _dates = require("../utils/dates");

function buildMakeCar() {
  return function makeCar({ ...entity
  }) {
    const {
      makerId,
      modelId,
      year,
      vin,
      odometerRangeId,
      licensePlate,
      cityId,
      owner,
      price,
      advanceNoticeId,
      minTripDurationId,
      maxTripDurationId,
      fuelId
    } = { ...entity
    };
    if (!makerId) throw new Error('Car must have a maker');
    if (!modelId) throw new Error('Car must have a model');
    if (!year) throw new Error('Car must have a year age'); // Validate the age of the car (max 11 year)

    if (!(0, _dates.validateMax)(year, 11)) throw new Error('Car cannot be more than 11 years seniority');
    if (!vin) throw new Error('Car must have a VIN');
    if (vin.length !== 17) throw new Error('Car VIN must have 17 characters');
    if (!odometerRangeId) throw new Error('Car must have an assigned mileage range');
    if (odometerRangeId === 4) throw new Error('Maximum mileage of 130k Km');
    if (!licensePlate) throw new Error('Car must have a license plate');
    if (!cityId) throw new Error('Car must be located within a city');
    if (!owner) throw new Error('Car must belong to a user');
    if (!price) throw new Error('Car must have a price');
    if (!advanceNoticeId) throw new Error('Car must have an advance notice');
    if (!fuelId) throw new Error('Car must have an fuel type assigned');
    if (!minTripDurationId) throw new Error('Car must have an assigned min trip duration');
    if (!maxTripDurationId) throw new Error('Car must have an assigned max trip duration');
    const car = Object.freeze({ ...entity
    });
    return car;
  };
}