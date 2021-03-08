import { DataTypes } from 'sequelize';

export default function buildCityModel({ client }) {
  const City = client.define(
    'City',
    {
      cityId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        field: 'city_id',
      },
      name: { type: DataTypes.STRING(150), allowNull: false },
    },
    { tableName: 'city', timestamps: false }
  );

  City.associate = (models) => {
    City.hasMany(models.Car);
  };

  return City;
}
