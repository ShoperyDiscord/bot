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
  .addSubcommand(sub => sub.setName("guild").setDescription("Pushes all commands to a specific server.").addStringOption(string => string.setName("guild").setRequired(true).setDescription("The ID of the server.")))
  .addSubcommand(sub => sub.setName("global").setDescription("Pushes all commands to all servers."));

////////////////////////
// The function that will be called when a user executed this command //
////////////////////////
async function executeCommand(interaction) {
    await interaction.editReply({
        content: "Loading...",
    })

}

module.exports = { data, executeCommand };