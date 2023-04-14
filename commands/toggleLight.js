const { SlashCommandBuilder } = require('discord.js');
const serialport = require('../serialconnection/serialconnection');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('toggle-light')
        .setDescription("Doesn't toggle the light, didn't expect that did ya?")
        .addIntegerOption((option) =>
            option
                .setName('color')
                .setDescription('Color for the led strip')
                .addChoices(
                    { name: 'red', value: 1 },
                    { name: 'orange', value: 2 },
                    { name: 'yellow', value: 3 },
                    { name: 'green', value: 4 },
                    { name: 'blue', value: 5 },
                    { name: 'indigo', value: 6 },
                    { name: 'biolet', value: 7 },
                    { name: 'purple', value: 8 },
                    { name: 'white', value: 9 }
                )
        ),
    async execute(interaction) {
        let input = interaction.options.getInteger('color') ?? 9;

        serialport.open((err) => {
            if (!err) serialport.write(input);
        });

        await interaction.reply(`Wrote ${input} to microbit`);
    },
};
