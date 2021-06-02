import { DataTypes } from 'sequelize';

export default function buildModelCategoryModel({ client }) {
  return client.define(
    'ModelCategory',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      modelId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'model_id',
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'category_id',
      },
    },
    { tableName: 'model_category', timestamps: false }
  );
}
