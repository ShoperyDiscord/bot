"use strict";
require("dotenv/config");
const utils = require("../framework/utils.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

/////////////////////////
// Data of the command //
/////////////////////////
const data = new SlashCommandBuilder()
  .setName("push")
  .setDescription("Pushes all commands to Discord.")
  .addSubcommand(sub => sub.setName("guild").setDescription("Pushes all commands to a specific server.").addStringOption(string => string.setName("guild").setRequired(true).setDescription("The ID of the server.")))
  .addSubcommand(sub => sub.setName("global").setDescription("Pushes all commands to all servers."));

////////////////////////
// The function that will be called when a user executed this command //
////////////////////////
async function executeCommand(interaction) {
  // Check if the user is one of Shopery's developers
  if (!process.env.SHOPERY_DEVS.includes(interaction.user.id))
    return interaction.editReply({
      embeds: embedReply("error", "You are not a developer."),
    });

  const subcommand = interaction.options.getSubcommand();
  switch (subcommand) {
    case "guild":
      if(await utils.discord.pushToGuild(interaction.options.getString("guild"))) return interaction.editReply({
        embeds: embedReply("success", "Successfully pushed commands to that guild."),
      });
    break;
    case "global":
      if(await utils.discord.pushToGlobal()) return interaction.editReply({
        embeds: embedReply("success", "Successfully pushed commands to all servers."),
      });
    break;
    default:
      return interaction.editReply({
        embeds: embedReply("error", "Unknown subcommand. (this shouldnt happen, contact us at https://shopery.xyz/support"),
      });      
  }
}

module.exports = { data, executeCommand };