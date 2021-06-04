"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = buildUserModel;

var _sequelize = require("sequelize");

function buildUserModel({
  client
}) {
  return client.define('User', {
    uuid: {
      type: _sequelize.DataTypes.UUIDV4,
      primaryKey: true,
      field: 'user_id'
    },
    firstName: {
      type: _sequelize.DataTypes.STRING(100),
      allowNull: false,
      field: 'first_name'
    },
    lastName: {
      type: _sequelize.DataTypes.STRING(100),
      allowNull: false,
      field: 'last_name'
    },
    email: {
      type: _sequelize.DataTypes.STRING(150),
      allowNull: false,
      field: 'email',
      validate: {
        isEmail: true
      }
    },
    password: {
      type: _sequelize.DataTypes.STRING(255),
      allowNull: true,
      field: 'password'
    },
    phone: {
      type: _sequelize.DataTypes.STRING(13),
      allowNull: false,
      field: 'phone'
    },
    identityDocument: {
      type: _sequelize.DataTypes.STRING(20),
      allowNull: false,
      field: 'document_id'
    },
    userType: {
      type: _sequelize.DataTypes.STRING,
      allowNull: false,
      field: 'user_type_id' // references: {
      //   model: 'UserType', // User belongsTo UserType 1:1
      //   key: 'typeId',
      // },

    },
    dateOfBirth: {
      type: _sequelize.DataTypes.DATE,
      allowNull: false,
      field: 'date_of_birth'
    },
    about: {
      type: _sequelize.DataTypes.STRING,
      field: 'about'
    },
    createdAt: {
      type: _sequelize.DataTypes.DATE,
      allowNull: false,
      field: 'created'
    },
    modifiedAt: {
      type: _sequelize.DataTypes.DATE,
      allowNull: false,
      field: 'modified'
    },
    status: {
      type: _sequelize.DataTypes.INTEGER,
      allowNull: false,
      field: 'status_id' // references: {
      //   model: 'Status', // User belongsTo Status 1:1
      //   key: 'statusId',
      // },

    },
    profilePhoto: {
      type: _sequelize.DataTypes.STRING,
      field: 'pic'
    },
    isEmailVerified: {
      type: _sequelize.DataTypes.BOOLEAN,
      allowNull: false,
      field: 'email_verified'
    },
    isPhoneVerified: {
      type: _sequelize.DataTypes.BOOLEAN,
      allowNull: false,
      field: 'phone_verified'
    }
  }, {
    tableName: 'huru_user',
    timestamps: false
  }); // User.associate = (models) => {
  //   User.belongsTo(models.UserType, { foreignKey: 'userType' });
  //   User.belongsTo(models.Status, { foreignKey: 'status' });
  //   User.hasMany(models.Car);
  //   User.hasMany(models.CarImage);
  // };
  // return User;
}