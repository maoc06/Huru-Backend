import { DataTypes } from 'sequelize';

export default function buildCarModel({ client }) {
  const Car = client.define(
    'Car',
    {
      carId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        field: 'car_id',
      },
      makerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'maker_id',
        references: {
          model: 'Maker', // Car belongsTo Maker 1:1
          key: 'makerId',
        },
      },
      modelId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'model_id',
        references: {
          model: 'CarModel', // Car belongsTo Model 1:1
          key: 'modelId',
        },
      },
      year: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      vin: {
        type: DataTypes.STRING(17),
        allowNull: false,
        validate: {
          len: [17, 17],
        },
      },
      odometerRangeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'odometer_range_id',
        references: {
          model: 'OdometerRange', // Car belongsTo OdometerRange 1:1
          key: 'odometerRangeId',
        },
      },
      licensePlate: {
        type: DataTypes.STRING(7),
        allowNull: false,
        field: 'license_plate',
      },
      description: {
        type: DataTypes.TEXT,
      },
      cityId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'city_id',
        references: {
          model: 'City', // Car belongsTo City n:1
          key: 'cityId',
        },
      },
      ownerUUID: {
        type: DataTypes.UUIDV4,
        allowNull: false,
        field: 'user_id',
        references: {
          model: 'User', // Car belongsTo User 1:1
          key: 'uuid',
        },
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      advanceNoticeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'advance_notice_id',
        references: {
          model: 'AdvanceNotice', // Car belongsTo AdvanceNotice 1:1
          key: 'advanceNoticeId',
        },
      },
      minTripDurationId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'min_trip_duration_id',
        references: {
          model: 'MinTripDuration', // Car belongsTo MinTripDuration 1:1
          key: 'minTripDurationId',
        },
      },
      maxTripDurationId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'max_trip_duration_id',
        references: {
          model: 'MaxTripDuration', // Car belongsTo MaxTripDuration 1:1
          key: 'maxTripDurationId',
        },
      },
      createdAt: {
        type: DataTypes.DATE,
        field: 'created',
      },
      modifiedAt: {
        type: DataTypes.DATE,
        field: 'modified',
      },
      status: {
        type: DataTypes.INTEGER,
        field: 'status_id',
        references: {
          model: 'Status', // Car belongsTo Status 1:1
          key: 'statusId',
        },
      },
    },
    { tableName: 'car', timestamps: false }
  );

  Car.associate = (models) => {
    Car.belongsTo(models.Maker, { foreignKey: 'makerId' });
    Car.belongsTo(models.CarModel, { foreignKey: 'modelId' });
    Car.belongsTo(models.OdometerRange, { foreignKey: 'odometerRangeId' });
    Car.belongsTo(models.City, { foreignKey: 'city' });
    Car.belongsTo(models.User, { foreignKey: 'userOwner' });
    Car.belongsTo(models.advanceNoticeId, { foreignKey: 'advanceNoticeId' });
    Car.belongsTo(models.MinTripDuration, { foreignKey: 'minTripDurationId' });
    Car.belongsTo(models.MaxTripDuration, { foreignKey: 'maxTripDurationId' });
    Car.belongsTo(models.Status, { foreignKey: 'status' });
    Car.hasMany(models.CarFeature);
    Car.hasMany(models.CarImage);
  };

  return Car;
}
