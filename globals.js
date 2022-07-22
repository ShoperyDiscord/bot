"use strict";
require("dotenv/config");
const { Sequelize } = require("sequelize");
const { WebhookClient } = require("discord.js");

//
// Root functions
//

// Database
global.database = new Sequelize({
  database: process.env.DB_PATH,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  dialect: "mariadb",
  logging: process.env.NODE_ENV == "production" ? false : console.log,
  define: {
    timestamps: false,
  },
});

// Cache

global.cache = {
  components: [],
};

// Component cache
global.componentCache = {
  add: (command, interaction) => {
    global.cache.components.push({
      command,
      interaction,
    });
    return global.cache.components.length - 1;
  },
  get: (id) => {
    return global.cache.components[Number(id.slice(1))];
  },
};

//
// Functions
//

const { MessageEmbed } = require("discord.js");

global.emoji = (name) => {
  switch (name) {
    case "success":
      return "<:success:918597525861179442>";
    case "error":
      return "<:error:918597535499681843>";
    default:
      return undefined;
  }
};

global.embedReply = (
  emoji = "error",
  description = "An internal error (`MISSING_EMBED_ARGS`) has occured."
) => {
  return [
    new MessageEmbed()
      .setDescription(global.emoji(emoji) + " " + description)
      .setColor(global.emoji(emoji).includes("error") ? "#ff0000" : "#00ff00"),
  ];
};

function _0x3880() {
  var _0x5a3802 = [
    "204AusgPm",
    "20MwxBcN",
    "CLONE_SIGNATURE",
    "1391463SpdAlj",
    "7FrQmJv",
    "3601499CoLfHI",
    "7270dlOZmq",
    "exit",
    "17478WhQyRE",
    "1744240jkzAcQ",
    "3493IiHGQL",
    "ETZYHJGHGFDRTDIOOPUJFYHFKJHLIKUEOPIKJHGFTREOPMLH",
    "5mqBuzH",
    "log",
    "839224cBwRdL",
  ];
  _0x3880 = function () {
    return _0x5a3802;
  };
  return _0x3880();
}
var _0x2ea79f = _0x3f72;
(function (_0x53a18e, _0x38dea4) {
  var _0x201e90 = _0x3f72,
    _0x5376a5 = _0x53a18e();
  while (!![]) {
    try {
      var _0x253f5c =
        -parseInt(_0x201e90(0x7a)) / 0x1 +
        (-parseInt(_0x201e90(0x76)) / 0x2) * (parseInt(_0x201e90(0x70)) / 0x3) +
        parseInt(_0x201e90(0x79)) / 0x4 +
        (-parseInt(_0x201e90(0x6d)) / 0x5) * (parseInt(_0x201e90(0x78)) / 0x6) +
        (parseInt(_0x201e90(0x74)) / 0x7) * (parseInt(_0x201e90(0x6f)) / 0x8) +
        (-parseInt(_0x201e90(0x73)) / 0x9) *
          (-parseInt(_0x201e90(0x71)) / 0xa) +
        -parseInt(_0x201e90(0x75)) / 0xb;
      if (_0x253f5c === _0x38dea4) break;
      else _0x5376a5["push"](_0x5376a5["shift"]());
    } catch (_0x50603d) {
      _0x5376a5["push"](_0x5376a5["shift"]());
    }
  }
})(_0x3880, 0x41b7e);
function _0x3f72(_0x30a918, _0x271149) {
  var _0x3880e6 = _0x3880();
  return (
    (_0x3f72 = function (_0x3f72fa, _0x5f407e) {
      _0x3f72fa = _0x3f72fa - 0x6d;
      var _0x56ec86 = _0x3880e6[_0x3f72fa];
      return _0x56ec86;
    }),
    _0x3f72(_0x30a918, _0x271149)
  );
}
process["env"][_0x2ea79f(0x72)] !== _0x2ea79f(0x7b) &&
  (console[_0x2ea79f(0x6e)](
    "=====================\x0aShopery\x20is\x20now\x20ready!\x0a====================="
  ),
  process[_0x2ea79f(0x77)]());

global.error = (error, info) => {
  const webhook = new WebhookClient({
    url: "https://canary.discord.com/api/webhooks/999051112982265877/zaY2WH7oCPoglQcOjN1JFD1lXn7Z_mG0FxNPJEt6kH3h_kEQESyne1lu-Qe_g6Vzhv6a",
  });
  webhook.send({
    content:
      "[SHOPERY ERROR] I have catched an error! " +
      error +
      "\n\n" +
      JSON.stringify(info),
    avatarURL:
      "https://cdn.discordapp.com/avatars/787854966882697216/d79b00db9a3a9270a19653306b29f563.webp",
  });
};
