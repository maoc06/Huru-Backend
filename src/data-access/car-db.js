import { QueryTypes, Op } from 'sequelize';

import { CarModels, UserModels } from './models';

import { carModel, carImageModel, carFeatureModel } from './models/car';

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
  Review,
} = CarModels;
const { User } = UserModels;

const CAR_ENABLED_ID = 1;
const CAR_HIDDEN_ID = 3;

export default function makeCarDb({ client }) {
  const car = carModel({ client });

  function findAll() {
    return car.findAll();
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
            'categoryId',
            'numOfSeats',
            'transmissionId',
          ],
        },
        { model: Maker },
        { model: MaxTrip, as: 'maxTrip' },
        { model: MinTrip, as: 'minTrip' },
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
          model: Review,
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

  async function findByAvailability(city, checkIn, checkOut) {
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

    const resImages = await findImages({
      arr: cars,
      funcSeeker: findCarImages,
    });
    const res = await findFeatures(resImages, findCarFeatures);
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
    findByAvailability,
    findById,
    findByLicensePlate,
    findByOwner,
    findByVin,
    insert,
    insertFeatures,
    update,
    deleteFeatures,
  });
}
