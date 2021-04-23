import { DataTypes } from 'sequelize';

export default function buildFavoriteModel({ client }) {
  return client.define(
    'favorite',
    {
      favoriteId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: true,
        field: 'favorite_id',
      },
      addedBy: {
        type: DataTypes.UUIDV4,
        allowNull: false,
        field: 'added_by_user',
      },
      carId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'car_id',
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
    }
  );
}
