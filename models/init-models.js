var DataTypes = require("sequelize").DataTypes;
var _api_keys = require("./api_keys");
var _applications = require("./applications");
var _ranks = require("./ranks");
var _sessions = require("./sessions");
var _team = require("./team");
var _users = require("./users");

function initModels(sequelize) {
  var api_keys = _api_keys(sequelize, DataTypes);
  var applications = _applications(sequelize, DataTypes);
  var ranks = _ranks(sequelize, DataTypes);
  var sessions = _sessions(sequelize, DataTypes);
  var team = _team(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  users.belongsTo(ranks, { as: "rank_rank", foreignKey: "rank" });
  ranks.hasMany(users, { as: "users", foreignKey: "rank" });
  api_keys.belongsTo(users, { as: "user_user", foreignKey: "user" });
  users.hasOne(api_keys, { as: "api_key", foreignKey: "user" });
  applications.belongsTo(users, { as: "user_user", foreignKey: "user" });
  users.hasMany(applications, { as: "applications", foreignKey: "user" });
  sessions.belongsTo(users, { as: "user_user", foreignKey: "user" });
  users.hasMany(sessions, { as: "sessions", foreignKey: "user" });
  team.belongsTo(users, { as: "user_user", foreignKey: "user" });
  users.hasOne(team, { as: "team", foreignKey: "user" });

  sessions.removeAttribute("id");

  return {
    api_keys,
    applications,
    ranks,
    sessions,
    team,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
