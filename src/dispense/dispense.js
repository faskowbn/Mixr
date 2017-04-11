/**
 * Created by brad on 4/4/2017.
 */
let gpio = require("pi-gpio");

module.exports.doGpio = function() {
    gpio.open(16, "output", function(err) {		// Open pin 16 for output
        gpio.write(16, 1, function() {			// Set pin 16 high (1)
            setTimeout(gpio.close(16), 3000);						// Close pin 16
        });
    });
}