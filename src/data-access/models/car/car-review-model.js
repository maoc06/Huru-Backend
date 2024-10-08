import { DataTypes } from 'sequelize';

export default function buildCarReviewModel({ client }) {
  return client.define(
    'CarReview',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        field: 'car_review_id',
      },
      carId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'car_id',
      },
      addedBy: {
        type: DataTypes.UUIDV4,
        allowNull: false,
        field: 'review_by_user',
      },
      bookingId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'booking_id',
      },
      comment: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      rating: {
        type: DataTypes.REAL,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        field: 'created',
      },
    },
    { tableName: 'car_review', timestamps: false }
  );
}
