import { DataTypes } from 'sequelize';

export default function buildUserReviewModel({ client }) {
  return client.define(
    'UserReview',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        field: 'user_review_id',
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'user_id',
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
    { tableName: 'huru_user_review', timestamps: false }
  );
}
