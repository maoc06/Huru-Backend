import { DataTypes } from 'sequelize';

export default function buildCarImageModel({ client }) {
  return client.define(
    'CarImage',
    {
      carImageId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        field: 'car_image_id',
      },
      carId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'car_id',
      },
      addedBy: {
        type: DataTypes.UUIDV4,
        allowNull: false,
        field: 'added_by_user',
      },
      imagePath: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: 'image',
        validate: { isUrl: true },
      },
      isMain: {
        type: DataTypes.BOOLEAN,
        field: 'is_main_image',
      },
    },
    { tableName: 'car_image', timestamps: false }
  );
}
