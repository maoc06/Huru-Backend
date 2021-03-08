import { DataTypes } from 'sequelize';

export default function buildCategoryModel({ client }) {
  const Category = client.define(
    'Category',
    {
      categoryId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        field: 'category_id',
      },
      name: { type: DataTypes.STRING, allowNull: false },
    },
    { tableName: 'category', timestamps: false }
  );

  Category.associate = (models) => {
    Category.hasMany(models.CarModel);
  };

  return Category;
}
