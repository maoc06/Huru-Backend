import { DataTypes } from 'sequelize';

export default function buildBookingStatusModel({ client }) {
  return client.define(
    'BookingStatus',
    {
      statusId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        field: 'booking_status_id',
      },
      name: { type: DataTypes.STRING(25), allowNull: false },
    },
    { tableName: 'booking_status', timestamps: false }
  );
}
