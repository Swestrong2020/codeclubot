import serial
import discord
from discord import app_commands
from dotenv import load_dotenv
import os


microbitSerial = serial.Serial("/dev/ttyACM0", 115200)

load_dotenv()
TOKEN = os.getenv('TOKEN')

intents = discord.Intents.default()

client = discord.Client(intents=intents)

@client.event
async def on_message(message):
    if message.author == client.user:
        return

    if message.content.startswith('$toggleLight'):
        microbitSerial.write(b"1")
        
        await message.channel.send('Toggled light, ya dipshit')

@client.event
async def on_ready():
    print(f'{client.user} has connected to Discord!')
    
client.run(TOKEN)