const { SlashCommandBuilder } = require("@discordjs/builders");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const fs = require("fs");

module.exports = {
  discord: {
    pushToGuild: async (guildId) => {
      const commands = [];
      const commandFiles = fs
        .readdirSync("./commands/")
        .filter((file) => file.endsWith(".js"));

      for (const file of commandFiles) {
        const command = require(`../commands/${file}`);
        commands.push(command.data.toJSON());
      }

      const rest = new REST({ version: "9" }).setToken(
        process.env.NODE_ENV === "production"
          ? process.env.SHOPERY_TOKEN
          : process.env.SHOPERY_TOKEN_DEV
      );

      try {
        await rest.put(
          Routes.applicationGuildCommands(
            process.env.NODE_ENV === "production"
              ? process.env.SHOPERY_ID
              : process.env.SHOPERY_ID_DEV,
            process.env.GUILD_DEV
          ),
          { body: commands }
        );
        return true;
      } catch (error) {
        global.error(error, {
          user_tag: interaction.user.tag,
          user_id: interaction.user.id,
          guild_id: guildId,
          command: "push",
          subcommand: "guild",
          args: [guildId],
        });
        return false;
      }
    },
    pushToGlobal: async () => {
      const commands = [];
      const commandFiles = fs
        .readdirSync("./commands/")
        .filter((file) => file.endsWith(".js"));

      for (const file of commandFiles) {
        const command = require(`../commands/${file}`);
        commands.push(command.data.toJSON());
      }

      const rest = new REST({ version: "9" }).setToken(
        process.env.NODE_ENV === "production"
          ? process.env.SHOPERY_TOKEN
          : process.env.SHOPERY_TOKEN_DEV
      );

      try {
        await rest.put(
          Routes.applicationCommands(
            process.env.NODE_ENV === "production"
              ? process.env.SHOPERY_ID
              : process.env.SHOPERY_ID_DEV,
            process.env.GUILD_DEV
          ),
          { body: commands }
        );
        return "All commands pushed to Discord.";
      } catch (error) {
        global.error(error, {
          user_tag: interaction.user.tag,
          user_id: interaction.user.id,
          guild_id: guildId,
          command: "push",
          subcommand: "global",
          args: [],
        });
        return "An internal error (`SLASH_PUSH_GLOBAL_FAILED`) has occured.";
      }
    },
  },
};
