const Gpio = require('pigpio').Gpio;

const pump = new Gpio(12, {mode: Gpio.OUTPUT});
console.log(pump.getPwmRange());


//pump.pwmWrite(0);
//pump.pwmWrite(255);
