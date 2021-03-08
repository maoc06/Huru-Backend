import { DataTypes } from 'sequelize';

export default function buildMaxTripDurationModel({ client }) {
  const MaxTripDuration = client.define(
    'MaxTripDuration',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        field: 'max_trip_duration_id',
      },
      name: { type: DataTypes.STRING(50), allowNull: false },
    },
    { tableName: 'max_trip_duration', timestamps: false }
  );

  MaxTripDuration.associate = (models) => {
    MaxTripDuration.hasMany(models.Car);
  };

  return MaxTripDuration;
}
