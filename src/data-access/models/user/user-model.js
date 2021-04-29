import { DataTypes } from 'sequelize';

export default function buildUserModel({ client }) {
  return client.define(
    'User',
    {
      uuid: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
        field: 'user_id',
      },
      firstName: {
        type: DataTypes.STRING(100),
        allowNull: false,
        field: 'first_name',
      },
      lastName: {
        type: DataTypes.STRING(100),
        allowNull: false,
        field: 'last_name',
      },
      email: {
        type: DataTypes.STRING(150),
        allowNull: false,
        field: 'email',
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: true,
        field: 'password',
      },
      phone: {
        type: DataTypes.STRING(13),
        allowNull: false,
        field: 'phone',
      },
      identityDocument: {
        type: DataTypes.STRING(20),
        allowNull: false,
        field: 'document_id',
      },
      userType: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'user_type_id',
        // references: {
        //   model: 'UserType', // User belongsTo UserType 1:1
        //   key: 'typeId',
        // },
      },
      dateOfBirth: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'date_of_birth',
      },
      about: {
        type: DataTypes.STRING,
        field: 'about',
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'created',
      },
      modifiedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'modified',
      },
      status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'status_id',
        // references: {
        //   model: 'Status', // User belongsTo Status 1:1
        //   key: 'statusId',
        // },
      },
      profilePhoto: {
        type: DataTypes.STRING,
        field: 'pic',
      },
      isEmailVerified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        field: 'email_verified',
      },
      isPhoneVerified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        field: 'phone_verified',
      },
    },
    {
      tableName: 'huru_user',
      timestamps: false,
    }
  );

  // User.associate = (models) => {
  //   User.belongsTo(models.UserType, { foreignKey: 'userType' });
  //   User.belongsTo(models.Status, { foreignKey: 'status' });
  //   User.hasMany(models.Car);
  //   User.hasMany(models.CarImage);
  // };

  // return User;
}
