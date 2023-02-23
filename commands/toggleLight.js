const { SlashCommandBuilder } = require('discord.js');
const microbitserial = require("../microbitserial/write-microbit");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('toggle-light')
        .setDescription("Doesn't toggle the light, didn't expect that did ya?")
        .addIntegerOption(option =>
            option.setName("color")
            .setDescription("Color for the led strip")
            .addChoices(
                { name: "red", value: 1},
                { name: "orange", value: 2},
                { name: "yellow", value: 3},
                { name: "green", value: 4},
                { name: "blue", value: 5},
                { name: "indigo", value: 6},
                { name: "biolet", value: 7},
                { name: "purple", value: 8},
                { name: "white", value: 9}
            )
        ),
    async execute(interaction) {
        let input = interaction.options.getInteger("color", false);

        if (!input)
            input = 9;

        microbitserial.write(`${input}`);

        await interaction.reply(`Wrote ${input} to microbit`);
    },
};