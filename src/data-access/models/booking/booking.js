import { DataTypes } from 'sequelize';

export default function buildBookingModel({ client }) {
  return client.define(
    'booking',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        field: 'booking_id',
      },
      bookingCar: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        field: 'car_id',
      },
      bookingBy: {
        type: DataTypes.UUIDV4,
        allowNull: false,
        field: 'user_id',
      },
      checkin: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'check_in_date',
      },
      checkout: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'check_out_date',
      },
      transactionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'transaction_id',
      },
      pricePerDay: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        field: 'price_per_day',
      },
      siteFees: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        field: 'site_fees',
      },
      isRefund: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        field: 'is_refund',
      },
      isCancel: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        field: 'is_cancel',
      },
      cancelDate: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'cancel_date',
      },
      refundPaid: {
        type: DataTypes.DOUBLE,
        allowNull: true,
        field: 'refund_paid',
      },
      bookingDate: {
        type: DataTypes.DATE,
        field: 'booking_date',
      },
      bookingAddress: {
        type: DataTypes.STRING(255),
        allowNull: true,
        field: 'booking_address',
      },
      bookingLongitude: {
        type: DataTypes.DOUBLE,
        allowNull: true,
        field: 'booking_longitude',
      },
      bookingLatitude: {
        type: DataTypes.DOUBLE,
        allowNull: true,
        field: 'booking_latitude',
      },
      modifiedAt: {
        type: DataTypes.DATE,
        field: 'modified',
      },
      bookingStatus: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'booking_status_id',
      },
    },
    { timestamps: false, freezeTableName: true }
  );
}
