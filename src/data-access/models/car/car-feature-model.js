import { DataTypes } from 'sequelize';

export default function buildCarFeatureModel({ client }) {
  return client.define(
    'CarFeature',
    {
      carFeatureId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        field: 'car_feature_id',
      },
      carId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'car_id',
      },
      featureId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'feature_id',
      },
    },
    { tableName: 'car_feature', timestamps: false }
  );
}
