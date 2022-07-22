"use strict";
require("dotenv/config");
const utils = require("../framework/utils.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const Users = require("../models/users.js");

/////////////////////////
// Data of the command //
/////////////////////////
const data = new SlashCommandBuilder()
  .setName("userinfo")
  .setDescription("Provides information about a you (or a user).")
  .addUserOption((user) => {
    user.setName("user").setRequired(false).setDescription("The user to get info about.");
  })

////////////////////////
// The function that will be called when a user executed this command //
////////////////////////
async function executeCommand(interaction) {
  await interaction.editReply({
    content: "Loading...",
  });
}

module.exports = { data, executeCommand };
