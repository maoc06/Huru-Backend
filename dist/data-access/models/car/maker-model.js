Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = buildMakerModel;

const _sequelize = require('sequelize');

function buildMakerModel({ client }) {
  return client.define(
    'maker',
    {
      makerId: {
        type: _sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        field: 'maker_id',
      },
      name: {
        type: _sequelize.DataTypes.STRING(75),
        allowNull: false,
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
    }
  );
}
