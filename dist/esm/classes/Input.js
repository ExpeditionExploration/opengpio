import { bindings } from '../bindings';
import { DriverStoppedError } from '../errors/DriverStoppedError';
import { GpioDriver } from './GpioDriver';
/**
 * Represents an input GPIO pin.
 * Extends the `GpioDriver` class to provide input-specific functionality.
 */
export class Input extends GpioDriver {
    /**
     * Constructs an `Input` instance.
     *
     * @param gpio - The GPIO pin configuration, including chip and line information.
     * @param options - Configuration options for the input pin, such as bias.
     */
    constructor(gpio, options = {}) {
        var _a;
        const [getter, cleanup] = bindings.input(gpio.chip, gpio.line, (_a = options.bias) !== null && _a !== void 0 ? _a : 0);
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
            throw new DriverStoppedError('Cannot get value from stopped input');
        }
        const value = this.getter();
        this.debug('input value is', value);
        return value;
    }
    set value(_value) {
        this.debug('setting input value is not allowed');
        throw new Error('Output cannot set value on an input pin');
    }
}
//# sourceMappingURL=Input.js.map