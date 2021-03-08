import { DataTypes } from 'sequelize';

export default function buildMinTripDurationModel({ client }) {
  const MinTripDuration = client.define(
    'MinTripDuration',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        field: 'min_trip_duration_id',
      },
      name: { type: DataTypes.STRING(50), allowNull: false },
    },
    { tableName: 'min_trip_duration', timestamps: false }
  );

  MinTripDuration.associate = (models) => {
    MinTripDuration.hasMany(models.Car);
  };

  return MinTripDuration;
}
