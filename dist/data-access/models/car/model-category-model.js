"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = buildModelCategoryModel;

var _sequelize = require("sequelize");

function buildModelCategoryModel({
  client
}) {
  return client.define('ModelCategory', {
    id: {
      type: _sequelize.DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    modelId: {
      type: _sequelize.DataTypes.INTEGER,
      allowNull: false,
      field: 'model_id'
    },
    categoryId: {
      type: _sequelize.DataTypes.INTEGER,
      allowNull: false,
      field: 'category_id'
    }
  }, {
    tableName: 'model_category',
    timestamps: false
  });
}