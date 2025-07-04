import { bindings } from '../bindings';
import { GpioDriver } from './GpioDriver';
import { DriverStoppedError } from '../errors/DriverStoppedError';
/**
 * Represents an output GPIO pin.
 * Extends the `GpioDriver` class to provide output-specific functionality.
 */
export class Output extends GpioDriver {
    /**
     * Constructs an `Output` instance.
     *
     * @param gpio - The GPIO pin configuration, including chip and line information.
     * @param options - Configuration options for the output pin.
     */
    constructor(gpio, options = {}) {
        const [setter, cleanup] = bindings.output(gpio.chip, gpio.line);
        super(cleanup);
        /**
         * A function to set the value of the GPIO pin.
         * Defaults to a no-op function.
         * @private
         */
        this.setter = () => { };
        this.lastValue = null;
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
            throw new DriverStoppedError('Cannot set value on stopped output');
        }
        this.debug('setting output value to', value);
        this.lastValue = value;
        this.setter(value);
    }
    /**
     * Gets the last value set on the output GPIO pin.
     * @returns {boolean | null} The last value set on the GPIO pin, or `null` if no value has been set.
     * @throws {DriverStoppedError} If the output has been stopped.
     */
    get value() {
        if (this.stopped) {
            this.debug('output is stopped, returning null');
            throw new DriverStoppedError('Cannot get value on stopped output');
        }
        this.debug('getting output value, last value was', this.lastValue);
        return this.lastValue;
    }
}
//# sourceMappingURL=Output.js.map