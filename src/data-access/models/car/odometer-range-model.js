import { DataTypes } from 'sequelize';

export default function buildOdometerRangeModel({ client }) {
  const OdometerRange = client.define(
    'OdometerRange',
    {
      odometerRangeId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        field: 'odometer_range_id',
      },
      range: { type: DataTypes.STRING(50), allowNull: false },
    },
    { tableName: 'odometer_range', timestamps: false }
  );

  OdometerRange.associate = (models) => {
    OdometerRange.hasMany(models.Car);
  };

  return OdometerRange;
}
