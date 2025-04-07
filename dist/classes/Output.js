"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Output = void 0;
const bindings_1 = require("../bindings");
const GpioDriver_1 = require("./GpioDriver");
const DriverStoppedError_1 = require("../errors/DriverStoppedError");
/**
 * Represents an output GPIO pin.
 * Extends the `GpioDriver` class to provide output-specific functionality.
 */
class Output extends GpioDriver_1.GpioDriver {
    /**
     * Constructs an `Output` instance.
     *
     * @param gpio - The GPIO pin configuration, including chip and line information.
     * @param options - Configuration options for the output pin.
     */
    constructor(gpio, options = {}) {
        const [setter, cleanup] = bindings_1.bindings.output(gpio.chip, gpio.line);
        super(cleanup);
        /**
         * A function to set the value of the GPIO pin.
         * Defaults to a no-op function.
         * @private
         */
        this.setter = () => { };
        this.debug('constructing output with', gpio, options);
        this.setter = setter;
    }
    /**
     * Sets the value of the output GPIO pin.
     *
     * @param value - The value to set on the GPIO pin (`true` for high, `false` for low).
     * @throws {DriverStoppedError} If the output has been stopped.
     */
    set value(value) {
        value = !!value; // Ensure value is boolean
        if (this.stopped) {
            this.debug('output is stopped, throwing error');
            throw new DriverStoppedError_1.DriverStoppedError('Cannot set value on stopped output');
        }
        this.debug('setting output value to', value);
        this.setter(value);
    }
}
exports.Output = Output;
//# sourceMappingURL=Output.js.map