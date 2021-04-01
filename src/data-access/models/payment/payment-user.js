import { DataTypes } from 'sequelize';

export default function buildPaymentUserModel({ client }) {
  const PaymentUser = client.define(
    'PaymentUser',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        field: 'payment_id',
      },
      addedBy: {
        type: DataTypes.UUIDV4,
        allowNull: false,
        field: 'added_by_user',
        references: {
          model: 'User',
          key: 'uuid',
        },
      },
      type: {
        type: DataTypes.STRING(5),
        allowNull: false,
      },
      brand: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      lastFour: {
        type: DataTypes.STRING(4),
        allowNull: true,
        field: 'last_four',
      },
      customerEmail: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: 'customer_email',
        validate: {
          isEmail: true,
        },
      },
      phone: {
        type: DataTypes.STRING(10),
        allowNull: true,
        field: 'phone_number',
      },
      isDefault: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        field: 'is_default',
      },
      status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'status_id',
        references: {
          model: 'Status',
          key: 'statusId',
        },
      },
    },
    { tableName: 'payment_user', timestamps: false }
  );

  return PaymentUser;
}
