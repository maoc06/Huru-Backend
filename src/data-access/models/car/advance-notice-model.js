import { DataTypes } from 'sequelize';

export default function buildAdvanceNoticeModel({ client }) {
  const AdvanceNotice = client.define(
    'AdvanceNotice',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        field: 'advance_notice_id',
      },
      name: { type: DataTypes.STRING(50), allowNull: false },
    },
    { tableName: 'advance_notice', timestamps: false }
  );

  AdvanceNotice.associate = (models) => {
    AdvanceNotice.hasMany(models.Car);
  };

  return AdvanceNotice;
}
