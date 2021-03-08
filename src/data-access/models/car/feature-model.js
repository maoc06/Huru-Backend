import { DataTypes } from 'sequelize';

export default function buildFeatureModel({ client }) {
  const Feature = client.define(
    'Feature',
    {
      featureId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        field: 'feature_id',
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      icon: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: 'icon_image',
      },
    },
    { tableName: 'feature', timestamps: false }
  );

  Feature.associate = (models) => {
    Feature.hasMany(models.CarFeature);
  };

  return Feature;
}
