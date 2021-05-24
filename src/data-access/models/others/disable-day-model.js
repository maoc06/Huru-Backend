import { DataTypes } from 'sequelize';

export default function buildDisableDayModel({ client }) {
  return client.define(
    'DisableDay',
    {
      disableDayId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: true,
        field: 'disable_day_id',
      },
      disableDay: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'disable_day',
      },
      carId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'car_id',
      },
    },
    {
      tableName: 'disable_day',
      timestamps: false,
      freezeTableName: true,
    }
  );
}
