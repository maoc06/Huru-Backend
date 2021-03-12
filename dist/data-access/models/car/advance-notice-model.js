"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = buildAdvanceNoticeModel;

var _sequelize = require("sequelize");

function buildAdvanceNoticeModel({
  client
}) {
  const AdvanceNotice = client.define('AdvanceNotice', {
    id: {
      type: _sequelize.DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      field: 'advance_notice_id'
    },
    name: {
      type: _sequelize.DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    tableName: 'advance_notice',
    timestamps: false
  });

  AdvanceNotice.associate = models => {
    AdvanceNotice.hasMany(models.Car);
  };

  return AdvanceNotice;
}