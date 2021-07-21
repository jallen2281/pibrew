module.exports = {
    //this:Gpio = require('pigpio').Gpio;

    pumpctl: function (gpio, percent, state) {
        Gpio = require('pigpio').Gpio;
        let pump = new Gpio(gpio, { mode: Gpio.OUTPUT });
        //255 highest to set variable voltage.
        var pow = Math.round((percent / 100) * 255);
        if (state.match(/off/i || percent == 0)) {
            pow = 0;
        }
        console.log(pow);
        pump.pwmWrite(pow);
        //pump.pwmWrite(255);
        return (1);
    }
}