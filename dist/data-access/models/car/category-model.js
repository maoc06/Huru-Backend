"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = buildCategoryModel;

var _sequelize = require("sequelize");

function buildCategoryModel({
  client
}) {
  const Category = client.define('Category', {
    categoryId: {
      type: _sequelize.DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      field: 'category_id'
    },
    name: {
      type: _sequelize.DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'category',
    timestamps: false
  });

  Category.associate = models => {
    Category.hasMany(models.CarModel);
  };

  return Category;
}