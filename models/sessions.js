const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "sessions",
    {
      user: {
        type: DataTypes.STRING(20),
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      platform: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      browser: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      country: {
        type: DataTypes.CHAR(2),
        allowNull: false,
      },
      creation_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.Sequelize.fn("current_timestamp"),
      },
      use_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      ip: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "sessions",
      timestamps: false,
      indexes: [
        {
          name: "FK_sessions_users",
          using: "BTREE",
          fields: [{ name: "user" }],
        },
      ],
    }
  );
};
