import { DataTypes } from 'sequelize';

export default function buildCarModel({ client }) {
  return client.define(
    'car',
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
      },
      modelId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'model_id',
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
      },
      owner: {
        type: DataTypes.UUIDV4,
        allowNull: false,
        field: 'user_id',
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      advanceNoticeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'advance_notice_id',
      },
      minTripDurationId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'min_trip_duration_id',
      },
      maxTripDurationId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'max_trip_duration_id',
      },
      fuelId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'fuel_id',
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
      },
    },
    { timestamps: false, freezeTableName: true }
  );
}
