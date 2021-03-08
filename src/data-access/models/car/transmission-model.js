import { DataTypes } from 'sequelize';

export default function buildTransmissionModel({ client }) {
  const Transmission = client.define(
    'Transmission',
    {
      transmissionId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        field: 'transmission_id',
      },
      name: { type: DataTypes.STRING, allowNull: false },
    },
    { tableName: 'transmission', timestamps: false }
  );

  Transmission.associate = (models) => {
    Transmission.hasMany(models.CarModel);
  };

  return Transmission;
}
