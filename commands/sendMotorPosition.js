const { SlashCommandBuilder } = require('discord.js');
const serialport = require('../serialconnection/serialconnection');
const numberbytes = require('../util/number-bytes');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('set-motor-position')
        .setDescription('Sets motor position to value ranging from 0 to 180')
        .addIntegerOption((option) =>
            option
                .setName('position')
                .setDescription('Position for the motor')
                .setMinValue(0)
                .setMaxValue(180)
                .setRequired(true)
        ),
    async execute(interaction) {
        let input = interaction.options.getInteger('position', true).toString(16);

        const buffer = new Buffer.alloc(3);

        buffer[0] = 0x02;
        buffer[1] = 0x00;
        buffer[2] = numberbytes.toBytes(parseInt(input));

        serialport.write(buffer);

        console.log(serialport.read(1));

        await interaction.reply(`Wrote 0x${input} to serial`);
    },
};
