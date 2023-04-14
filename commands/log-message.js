const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('log-message')
        .setDescription('Logs a message to the console')
        .addStringOption((option) =>
            option
                .setRequired(true)
                .setName('content')
                .setDescription('Message to log to the console')
                .setRequired(true)
        ),
    async execute(interaction) {
        console.log(interaction.options.getString('content', true));

        await interaction.reply('Did thayut');
    },
};
