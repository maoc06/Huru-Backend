import { QueryTypes } from 'sequelize';

import {
  carModel,
  carImageModel,
  carFeatureModel,
  carReview,
} from './models/car';

import findImages from '../utils/findImages';
import findFeatures from '../utils/findFeatures';

export default function makeCarDb({ client }) {
  const car = carModel({ client });

  function findAll() {
    return car.findAll();
  }

  function findById(carId) {
    return car.findByPk(carId);
  }

  function findByVin(vin) {
    return car.findAll({ where: { vin } });
  }

  function findByLicensePlate(licensePlate) {
    return car.findAll({ where: { licensePlate } });
  }

  function findByOwnerUUID(ownerUUID) {
    return car.findAll({ where: { ownerUUID } });
  }

  function insert({ ...carInfo }) {
    return car.create({ ...carInfo });
  }

  async function update({ ...carInfo }) {
    const { carId } = { ...carInfo };
    const res = await car.update(
      { ...carInfo },
      { where: { car_id: carId }, returning: true, plain: true }
    );
    return res[1].dataValues;
  }

  async function findCarImages(carId, isMultiple) {
    const carImages = carImageModel({ client });
    let res = {};
    if (isMultiple) {
      res = await carImages.findAll({ where: { carId }, raw: true });
    } else {
      res = await carImages.findOne({
        where: { carId, isMain: true },
        raw: true,
      });
    }
    return res;
  }

  async function findCarFeatures(carId) {
    const carFeatures = carFeatureModel({ client });
    const res = await carFeatures
      .findAll({
        attributes: ['featureId'],
        where: { carId },
        raw: true,
      })
      .then((features) => features.map((feature) => feature.featureId));
    return res;
  }

  async function findCarReviews(carId) {
    const carReviewModel = carReview({ client });
    const reviews = await carReviewModel.findAll({
      where: { carId },
      raw: true,
    });
    return reviews;
  }

  async function findCarsByCity(city, checkIn, checkOut) {
    const cars = await client.query(
      `SELECT 
        car.car_id,  
        maker.name, 
        model.model, 
        car.year, 
        model.category_id, 
	      model.number_of_seats, 
	      model.transmission_id,
        car.description, 
        car.price,
        city.city
      FROM 
        car 
        NATURAL JOIN maker 
        NATURAL JOIN model
        NATURAL JOIN city
      WHERE LOWER(city.city)
        LIKE LOWER(:city)
        AND car.car_id NOT IN 
        (
          SELECT car_id
          FROM booking
          WHERE
            (
              (check_in_date <= :checkInSelected and check_out_date >= :checkInSelected) 
              OR
              (check_in_date < :checkOutSelected and check_out_date >= :checkOutSelected)
              OR
              (check_in_date >= :checkInSelected and check_out_date < :checkOutSelected)
            )
            AND
            booking_status_id != 1
        )`,
      {
        replacements: {
          city: `%${city}%`,
          checkInSelected: checkIn,
          checkOutSelected: checkOut,
        },
        type: QueryTypes.SELECT,
      }
    );

    const resImages = await findImages(cars, findCarImages, false);
    const res = await findFeatures(resImages, findCarFeatures);
    return res;
  }

  async function findCar(carId) {
    const carInfo = await client.query(
      `SELECT 
        car.car_id,
        car.user_id,
        maker.name, 
        model.model, 
        car.year, 
        model.category_id, 
	      model.number_of_seats, 
	      model.transmission_id,
        car.description, 
        car.price
      FROM 
        car 
        NATURAL JOIN maker 
        NATURAL JOIN model
      WHERE car.car_id = ?`,
      {
        replacements: [carId],
        type: QueryTypes.SELECT,
      }
    );

    carInfo[0].reviews = await findCarReviews(carId);
    const resImages = await findImages(carInfo, findCarImages, true);
    const res = await findFeatures(resImages, findCarFeatures);
    return res[0];
  }

  return Object.freeze({
    findAll,
    findById,
    findCar,
    findByVin,
    findByLicensePlate,
    findByOwnerUUID,
    insert,
    update,
    findCarsByCity,
  });
}
