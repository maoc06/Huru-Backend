"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = buildStatusModel;

var _sequelize = require("sequelize");

function buildStatusModel({
  client
}) {
  const Status = client.define('Status', {
    statusId: {
      type: _sequelize.DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      field: 'status_id'
    },
    name: {
      type: _sequelize.DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'status',
    timestamps: false
  });

  Status.associate = models => {
    Status.hasMany(models.User);
    Status.hasMany(models.Car);
  };

  return Status;
}