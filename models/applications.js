const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "applications",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.SMALLINT.UNSIGNED,
        allowNull: false,
        primaryKey: true,
      },
      creation_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.Sequelize.fn("current_timestamp"),
      },
      user: {
        type: DataTypes.STRING(20),
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      question_one: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      question_two: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      question_three: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      question_four: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      review_status: {
        type: DataTypes.STRING(8),
        allowNull: false,
        defaultValue: "pending",
      },
      review_reason: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      review_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "applications",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id" }],
        },
        {
          name: "FK_applications_users",
          using: "BTREE",
          fields: [{ name: "user" }],
        },
      ],
    }
  );
};
