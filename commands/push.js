"use strict";
require("dotenv/config");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const fs = require("fs");

/////////////////////////
// Data of the command //
/////////////////////////

const data = new SlashCommandBuilder()
  .setName("push")
  .setDescription("Push Slash commands to Discord.");

////////////////////////
// Command to execute //
////////////////////////

async function executeCommand(interaction) {
  // Check if the user is one of Shopery's developers
  if (!process.env.SHOPERY_DEVS.includes(interaction.user.id))
    return interaction.editReply({
      embeds: embedReply("error", "You are not a developer."),
    });

  const commands = [];
  const commandFiles = fs
    .readdirSync("./commands/")
    .filter((file) => file.endsWith(".js"));

  for (const file of commandFiles) {
    const command = require(`./${file}`);
    commands.push(command.data.toJSON());
  }

  const rest = new REST({ version: "9" }).setToken(process.env.BOT_TOKEN);

  try {
    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_DEV
      ),
      { body: commands }
    );
    await rest.put(
      Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD),
      { body: commands }
    );
    interaction.editReply({
      embeds: embedReply(
        "success",
        "Slash commands have been pushed to Discord."
      ),
    });
  } catch (error) {
    interaction.editReply({
      embeds: embedReply(
        "error",
        "An internal error (`SLASH_PUSH_FAILED`) has occured."
      ),
    });
  }
}

module.exports = { data, executeCommand };
