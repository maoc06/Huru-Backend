import { DataTypes } from 'sequelize';

export default function buildUserTypeModel({ client }) {
  const UserType = client.define(
    'UserType',
    {
      typeId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        field: 'user_type_id',
      },
      type: { type: DataTypes.STRING, allowNull: false, field: 'user_type' },
    },
    { tableName: 'user_type', timestamps: false }
  );

  UserType.associate = (models) => {
    UserType.hasMany(models.User);
  };

  return UserType;
}
