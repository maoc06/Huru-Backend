import { DataTypes } from 'sequelize';

export default function buildMakerModel({ client }) {
  const Maker = client.define(
    'Maker',
    {
      makerId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        field: 'maker_id',
      },
      name: { type: DataTypes.STRING(75), allowNull: false },
    },
    { tableName: 'maker', timestamps: false }
  );

  Maker.associate = (models) => {
    Maker.hasMany(models.Car);
    Maker.hasMany(models.CarModel);
  };

  return Maker;
}
