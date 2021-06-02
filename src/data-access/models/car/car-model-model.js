import { DataTypes } from 'sequelize';

export default function buildCarModelModel({ client }) {
  return client.define(
    'model',
    {
      modelId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        field: 'model_id',
      },
      makerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'maker_id',
      },
      name: { type: DataTypes.STRING(150), allowNull: false, field: 'model' },
      numOfSeats: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'number_of_seats',
      },
      transmissionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'transmission_id',
      },
    },
    { timestamps: false, freezeTableName: true }
  );
}
