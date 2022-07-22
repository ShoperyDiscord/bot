"use strict";
require("dotenv/config");
const { Client, Collection, Intents, MessageEmbed } = require("discord.js");
const fs = require("fs");
require("./globals.js");

// Define the client
let intents = new Intents(Intents.NON_PRIVILEGED);
intents.add("GUILD_MEMBERS");
const client = new Client({
  intents,
  presence: {
    status: process.env.STATUS,
    activities: [
      {
        name: process.env.ACTIVITY_NAME,
        type: process.env.ACTIVITY_TYPE,
      },
    ],
  },
});

// React on 'interactionCreate' which is a Slash command usage or a Component
client.on("interactionCreate", async (interaction) => {
  if (interaction.isCommand()) {
    const command = client.commands.get(interaction.commandName);

    if (!command)
      return interaction.reply({
        embeds: global.embedReply(
          "error",
          "An internal error (`INTERNAL_COMMAND_MISSING`) has occured."
        ),
      });

    try {
      await interaction.deferReply();
      await command.executeCommand(interaction);
    } catch (error) {
      await interaction.editReply({
        embeds: global.embedReply("error", error),
      });
    }
  } else if (interaction.isMessageComponent()) {
    const component = client.commands.get(
      global.componentCache.get(interaction.customId)?.command
    );

    if (!component)
      return interaction.reply({
        embeds: global.embedReply(
          "error",
          "An internal error (`COMPONENT_EXPIRED`) has occured."
        ),
        ephemeral: true,
      });
    if (
      global.componentCache.get(interaction.customId).interaction.user.id !=
      interaction.user.id
    )
      return interaction.reply({
        embeds: global.embedReply(
          "error",
          "You are not the owner of this component."
        ),
        ephemeral: true,
      });

    try {
      await component.executeComponent(
        interaction,
        global.componentCache.get(interaction.customId).interaction
      );
    } catch (error) {
      await interaction.reply({
        embeds: global.embedReply("error", error),
        ephemeral: true,
      });
    }
  }
});

client.once("ready", async () => {
  // Define the commands collections and add commands to it
  client.commands = new Collection();
  const commandFiles = fs
    .readdirSync("./commands")
    .filter((file) => file.endsWith(".js"));
  for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
    console.log(`✨ | Loaded command: ${command.data.name}`);
  }

  // Define the events the bot should be listening to
  const eventFiles = fs
    .readdirSync("./events")
    .filter((file) => file.endsWith(".js"));

  for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    if (event.once) {
      client.once(event.name, (...args) => event.executeEvent(...args));
      console.log(`✨ | Loaded event: ${event.name}`);
    } else {
      client.on(event.name, (...args) => event.executeEvent(...args));
      console.log(`✨ | Loaded event: ${event.name}`);
    }
  }

  console.log(
    "=====================\nShopery is now ready!\n====================="
  );
});

global.database.authenticate().then(() => {
  client.login(
    process.env.NODE_ENV === "production"
      ? process.env.SHOPERY_TOKEN
      : process.env.SHOPERY_TOKEN_DEV
  );
});

global.client = client;
