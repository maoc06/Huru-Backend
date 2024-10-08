import { QueryTypes, Op } from 'sequelize';

import { CarModels, UserModels, SharedModels } from './models';

import { carModel, carImageModel } from './models/car';

import findImages from '../utils/findImages';
import findFeatures from '../utils/findFeatures';

const {
  AdvanceNotice,
  Car,
  CarFeature,
  Feature,
  Image,
  Maker,
  MaxTrip,
  MinTrip,
  Model,
  ModelCategory,
  CarReview,
  Fuel,
} = CarModels;
const { User } = UserModels;
const { City } = SharedModels;

const CAR_ENABLED_ID = 1;
const CAR_HIDDEN_ID = 3;

export default function makeCarDb({ client }) {
  const car = carModel({ client });

  function findAll() {
    return car.findAll();
  }

  function findByIdSimple(carId) {
    return Car.findOne({
      where: {
        carId,
      },
    });
  }

  function findById(carId) {
    return Car.findOne({
      where: {
        carId,
      },
      attributes: {
        exclude: [
          'makerId',
          'modelId',
          'owner',
          'advanceNoticeId',
          'minTripDurationId',
          'maxTripDurationId',
          'fuelId',
          'cityId',
        ],
      },
      include: [
        { model: AdvanceNotice, as: 'advanceNotice' },
        {
          model: Image,
          as: 'images',
          attributes: ['carImageId', 'imagePath', 'isMain'],
        },
        {
          model: CarFeature,
          as: 'features',
          attributes: ['featureId'],
          include: { model: Feature, attributes: ['name'] },
        },
        {
          model: Model,
          attributes: [
            'modelId',
            'name',
            // 'categoryId',
            'numOfSeats',
            'transmissionId',
          ],
          include: [
            {
              model: ModelCategory,
              as: 'categories',
              attributes: { exclude: ['modelId'] },
            },
          ],
        },
        { model: Maker },
        { model: MaxTrip, as: 'maxTrip' },
        { model: MinTrip, as: 'minTrip' },
        { model: Fuel, as: 'fuel' },
        { model: City, as: 'city' },
        {
          model: User,
          as: 'userOwner',
          attributes: [
            'uuid',
            'firstName',
            'lastName',
            'profilePhoto',
            'createdAt',
          ],
        },
        {
          model: CarReview,
          as: 'reviews',
          attributes: { exclude: ['carId', 'addedBy'] },
          include: {
            model: User,
            as: 'reviewBy',
            attributes: [
              'uuid',
              'firstName',
              'lastName',
              'profilePhoto',
              'createdAt',
            ],
          },
        },
      ],
      order: [['carId', 'DESC']],
    });
  }

  function findByVin(vin) {
    return car.findAll({ where: { vin } });
  }

  function findByLicensePlate(licensePlate) {
    return car.findAll({ where: { licensePlate } });
  }

  function findByOwner(owner) {
    return Car.findAll({
      where: {
        owner,
        status: { [Op.or]: [CAR_ENABLED_ID, CAR_HIDDEN_ID] },
      },
      attributes: ['carId', 'year', 'owner', 'price', 'status'],
      include: [
        {
          model: Image,
          as: 'images',
          attributes: ['carImageId', 'imagePath'],
          where: { isMain: true },
        },
        { model: Model, attributes: ['modelId', 'name'] },
        Maker,
      ],
      order: [['carId', 'DESC']],
    });
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

  function findCarFeatures(carId) {
    return CarFeature.findAll({
      attributes: ['featureId'],
      where: { carId },
      include: { model: Feature, attributes: ['name'] },
    });
  }

  function findModelCategories(modelId) {
    return ModelCategory.findAll({
      attributes: { exclude: ['modelId'] },
      where: { modelId },
    });
  }

  async function findByAvailability(city, checkIn, checkOut) {
    const cars = await client.query(
      `SELECT 
        car.car_id,  
        maker.name, 
        model.model_id,
        model.model,
        car.year, 
	      model.number_of_seats, 
	      model.transmission_id,
        car.description, 
        car.price,
        car.advance_notice_id,
        car.min_trip_duration_id,
        car.max_trip_duration_id,
        city.city
      FROM 
        car 
        NATURAL JOIN maker 
        NATURAL JOIN model
        NATURAL JOIN city
      WHERE LOWER(city.city)
        LIKE LOWER(:city)
        AND car.status_id = 1
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
        )
        AND car.car_id NOT IN
        (
          SELECT car_id
          FROM disable_day
          WHERE
            (
              disable_day >= :checkInSelected
              AND
              disable_day <= :checkOutSelected
            )
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

    let res = await findImages({
      arr: cars,
      funcSeeker: findCarImages,
    });

    res = await findFeatures({
      arr: res,
      funcSeeker: findCarFeatures,
      propName: 'features',
    });

    res = await findFeatures({
      arr: res,
      funcSeeker: findModelCategories,
      propName: 'categories',
      propKey: 'model_id',
    });

    return res;
  }

  function insert({ ...carInfo }) {
    return car.create({ ...carInfo });
  }

  function insertFeatures(carFeatures) {
    return CarFeature.bulkCreate(carFeatures);
  }

  async function update({ ...carInfo }) {
    const { carId } = { ...carInfo };
    const res = await car.update(
      { ...carInfo },
      { where: { carId }, returning: true, plain: true }
    );
    return res[1].dataValues;
  }

  function deleteFeatures(carId) {
    return CarFeature.destroy({ where: { carId } });
  }

  return Object.freeze({
    findAll,
    findCarFeatures,
    findByAvailability,
    findById,
    findByIdSimple,
    findByLicensePlate,
    findByOwner,
    findByVin,
    findCarImages,
    insert,
    insertFeatures,
    update,
    deleteFeatures,
  });
}
