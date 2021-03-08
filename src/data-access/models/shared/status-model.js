import { DataTypes } from 'sequelize';

export default function buildStatusModel({ client }) {
  const Status = client.define(
    'Status',
    {
      statusId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        field: 'status_id',
      },
      name: { type: DataTypes.STRING, allowNull: false },
    },
    { tableName: 'status', timestamps: false }
  );

  Status.associate = (models) => {
    Status.hasMany(models.User);
    Status.hasMany(models.Car);
  };

  return Status;
}
