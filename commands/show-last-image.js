const { SlashCommandBuilder } = require('discord.js');
const fs = require("node:fs");
const path = require("path");

const imagedir = path.join(__dirname, "/image");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('show-last-message')
        .setDescription('Shows last image taken by picamera'),
    async execute(interaction) {
        await interaction.channel.send("Last image taken", {files:[{ attachment: (imagedir+"last.jpeg") }]});
    },
};
