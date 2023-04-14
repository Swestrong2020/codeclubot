const { SerialPort } = require('serialport');
const config = require('./config.json');

const port = new SerialPort({
    path: config.devicePath,
    baudRate: config.baudRate,
});

port.on('open', () => {
    console.log('Port succesfully opened!');
});

port.on('error', (error) => {
    console.log(`Error with microbit: ${error.message}`);
});

port.on('close', () => {
    console.log('Microbit serial port closed!');
});

module.exports = port;
