import { DataTypes } from 'sequelize';

export default function buildTransactionModel({ client }) {
  const Transaction = client.define(
    'Transaction',
    {
      transactionId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        field: 'id',
      },
      transactionNumber: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'transaction_number',
      },
      reference: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      paymentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'payment_id',
        references: {
          model: 'PaymentUser',
          key: 'id',
        },
      },
      status: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
    },
    { tableName: 'transaction', timestamps: false }
  );

  return Transaction;
}
