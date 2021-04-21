import { DataTypes } from 'sequelize';

export default function buildMakerModel({ client }) {
  return client.define(
    'maker',
    {
      makerId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        field: 'maker_id',
      },
      name: { type: DataTypes.STRING(75), allowNull: false },
    },
    { timestamps: false, freezeTableName: true }
  );
}
