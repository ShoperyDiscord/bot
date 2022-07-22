const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "api_keys",
    {
      user: {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: "",
        primaryKey: true,
        references: {
          model: "users",
          key: "id",
        },
      },
      creation_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.Sequelize.fn("current_timestamp"),
      },
      last_use: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      uses: {
        type: DataTypes.MEDIUMINT.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      tableName: "api_keys",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "user" }],
        },
      ],
    }
  );
};
