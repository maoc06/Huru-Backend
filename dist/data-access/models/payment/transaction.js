"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = buildTransactionModel;

var _sequelize = require("sequelize");

function buildTransactionModel({
  client
}) {
  const Transaction = client.define('Transaction', {
    transactionId: {
      type: _sequelize.DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      field: 'id'
    },
    transactionNumber: {
      type: _sequelize.DataTypes.INTEGER,
      allowNull: true,
      field: 'transaction_number'
    },
    reference: {
      type: _sequelize.DataTypes.STRING(100),
      allowNull: true
    },
    paymentId: {
      type: _sequelize.DataTypes.INTEGER,
      allowNull: false,
      field: 'payment_id',
      references: {
        model: 'PaymentUser',
        key: 'id'
      }
    },
    status: {
      type: _sequelize.DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    tableName: 'transaction',
    timestamps: false
  });
  return Transaction;
}