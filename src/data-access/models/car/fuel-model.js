import { DataTypes } from 'sequelize';

export default function buildFuelModel({ client }) {
  return client.define(
    'fuel',
    {
      fuelId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        field: 'fuel_id',
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
    },
    { timestamps: false, freezeTableName: true }
  );
}
