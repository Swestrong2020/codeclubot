"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const dotenv = __importStar(require("dotenv"));
const fs = __importStar(require("node:fs"));
const path = __importStar(require("node:path"));
dotenv.config({ path: __dirname + "/.env" });
const token = process.env.TOKEN;
const client = new discord_js_1.Client({ intents: [discord_js_1.GatewayIntentBits.Guilds] });
const globalCommands = new discord_js_1.Collection();
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith("js"));
function putCommandsGlobal() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        for (const file of commandFiles) {
            const filePath = path.join(commandsPath, file);
            const command = yield (_a = filePath, Promise.resolve().then(() => __importStar(require(_a))));
            globalCommands.set(command.data.name, command);
        }
    });
}
client.on(discord_js_1.Events.InteractionCreate, (interaction) => __awaiter(void 0, void 0, void 0, function* () {
    if (!interaction.isCommand() || interaction.isChatInputCommand())
        return;
    const command = globalCommands.get(interaction.commandName);
    if (!command) {
        console.log(`${command}: No such command`);
        return;
    }
    try {
        yield command.execute(interaction);
    }
    catch (e) {
        console.log(e);
        yield interaction.reply({ content: "There was an error running this command :(", ephemeral: true });
    }
}));
client.once(discord_js_1.Events.ClientReady, c => {
    console.log(`Logged in as ${c.user.tag}`);
});
putCommandsGlobal();
client.login(token);