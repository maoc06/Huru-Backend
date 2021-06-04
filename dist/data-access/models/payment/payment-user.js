"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = buildPaymentUserModel;

var _sequelize = require("sequelize");

function buildPaymentUserModel({
  client
}) {
  const PaymentUser = client.define('PaymentUser', {
    id: {
      type: _sequelize.DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      field: 'payment_id'
    },
    addedBy: {
      type: _sequelize.DataTypes.UUIDV4,
      allowNull: false,
      field: 'added_by_user',
      references: {
        model: 'User',
        key: 'uuid'
      }
    },
    type: {
      type: _sequelize.DataTypes.STRING(5),
      allowNull: false
    },
    brand: {
      type: _sequelize.DataTypes.STRING(50),
      allowNull: true
    },
    lastFour: {
      type: _sequelize.DataTypes.STRING(4),
      allowNull: true,
      field: 'last_four'
    },
    customerEmail: {
      type: _sequelize.DataTypes.STRING(255),
      allowNull: false,
      field: 'customer_email',
      validate: {
        isEmail: true
      }
    },
    phone: {
      type: _sequelize.DataTypes.STRING(10),
      allowNull: true,
      field: 'phone_number'
    },
    isDefault: {
      type: _sequelize.DataTypes.BOOLEAN,
      allowNull: true,
      field: 'is_default'
    },
    status: {
      type: _sequelize.DataTypes.INTEGER,
      allowNull: false,
      field: 'status_id',
      references: {
        model: 'Status',
        key: 'statusId'
      }
    }
  }, {
    tableName: 'payment_user',
    timestamps: false
  });
  return PaymentUser;
}