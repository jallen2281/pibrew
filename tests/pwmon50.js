const Gpio = require('pigpio').Gpio;

const pump = new Gpio(12, {mode: Gpio.OUTPUT});
pump.pwmWrite(255);
//pump.pwmWrite(255);
