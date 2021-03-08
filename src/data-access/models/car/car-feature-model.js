import { DataTypes } from 'sequelize';

export default function buildCarFeatureModel({ client }) {
  const CarFeature = client.define(
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
        references: {
          model: 'Car', // Car-Feature belongsTo Car 1:1
          key: 'carId',
        },
      },
      featureId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'feature_id',
        references: {
          model: 'Feature', // Car-Feature belongsTo Feature 1:1
          key: 'featureId',
        },
      },
    },
    { tableName: 'car_feature', timestamps: false }
  );

  CarFeature.associate = (models) => {
    CarFeature.belongsTo(models.Car, { foreignKey: 'carId' });
    CarFeature.belongsTo(models.Feature, { foreignKey: 'featureId' });
  };

  return CarFeature;
}
