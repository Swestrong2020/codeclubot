const { SlashCommandBuilder } = require('discord.js');
const { exec } = require('child_process');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('start-teamviewer')
        .setDescription('Starts teamviewer if it is not open already.'),
    async execute(interaction) {
        exec(`screen -dm teamviewer -X "teamviewer"`);

        await interaction.reply('Did thayut');
    },
};
