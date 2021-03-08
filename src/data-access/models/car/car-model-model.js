import { DataTypes } from 'sequelize';

export default function buildCarModelModel({ client }) {
  const CarModel = client.define(
    'CarModel',
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
        references: {
          model: 'Maker', // Model belongsTo Maker 1:1
          key: 'makerId',
        },
      },
      name: { type: DataTypes.STRING(150), allowNull: false },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'category_id',
        references: {
          model: 'Category', // Model belongsTo Category 1:1
          key: 'categoryId',
        },
      },
      transmissionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'transmission_id',
        references: {
          model: 'Transmission', // Model belongsTo Transmission 1:1
          key: 'transmissionId',
        },
      },
    },
    { tableName: 'model', timestamps: false }
  );

  CarModel.associate = (models) => {
    CarModel.belongsTo(models.Maker, { foreign: 'makerId' });
    CarModel.belongsTo(models.Category, { foreign: 'categoryId' });
    CarModel.belongsTo(models.Transmission, { foreign: 'transmissionId' });
    CarModel.hasmany(models.Car);
  };

  return CarModel;
}
