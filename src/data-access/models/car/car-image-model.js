import { DataTypes } from 'sequelize';

export default function buildCarImageModel({ client }) {
  const CarImage = client.define(
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
        references: {
          model: 'Car', // CarImage belongsTo Car 1:1
          key: 'carId',
        },
      },
      addedBy: {
        type: DataTypes.UUIDV4,
        allowNull: false,
        field: 'added_by_user',
        references: {
          model: 'User', // CarImage belongsTo User 1:1
          key: 'uuid',
        },
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

  CarImage.associate = (models) => {
    CarImage.belongsTo(models.Car, { foreignKey: 'carId' });
    CarImage.belongsTo(models.User, { foreignKey: 'addedBy' });
  };

  return CarImage;
}
