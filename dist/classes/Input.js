"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Input = void 0;
const bindings_1 = require("../bindings");
const DriverStoppedError_1 = require("../errors/DriverStoppedError");
const GpioDriver_1 = require("./GpioDriver");
/**
 * Represents an input GPIO pin.
 * Extends the `GpioDriver` class to provide input-specific functionality.
 */
class Input extends GpioDriver_1.GpioDriver {
    /**
     * Constructs an `Input` instance.
     *
     * @param gpio - The GPIO pin configuration, including chip and line information.
     * @param options - Configuration options for the input pin, such as bias.
     */
    constructor(gpio, options = {}) {
        var _a;
        const [getter, cleanup] = bindings_1.bindings.input(gpio.chip, gpio.line, (_a = options.bias) !== null && _a !== void 0 ? _a : 0);
        super(cleanup);
        /**
         * A function to retrieve the current value of the GPIO pin.
         * Defaults to a function that always returns `false`.
         */
        this.getter = () => false;
        this.debug('constructing input with', gpio, options);
        this.getter = getter;
    }
    /**
     * Gets the current value of the input pin.
     *
     * @throws {DriverStoppedError} If the input has been stopped.
     * @returns The current value of the GPIO pin (`true` for high, `false` for low).
     */
    get value() {
        this.debug('getting input value');
        if (this.stopped) {
            this.debug('input is stopped, throwing error');
            throw new DriverStoppedError_1.DriverStoppedError('Cannot get value from stopped input');
        }
        const value = this.getter();
        this.debug('input value is', value);
        return value;
    }
}
exports.Input = Input;
