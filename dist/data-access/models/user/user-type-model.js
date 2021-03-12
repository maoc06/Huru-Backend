"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = buildUserTypeModel;

var _sequelize = require("sequelize");

function buildUserTypeModel({
  client
}) {
  const UserType = client.define('UserType', {
    typeId: {
      type: _sequelize.DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      field: 'user_type_id'
    },
    type: {
      type: _sequelize.DataTypes.STRING,
      allowNull: false,
      field: 'user_type'
    }
  }, {
    tableName: 'user_type',
    timestamps: false
  });

  UserType.associate = models => {
    UserType.hasMany(models.User);
  };

  return UserType;
}