import debug from '../debug';
import { bindings } from '../bindings';
import { Gpio, PinSetter, GpioOutputOptions } from '../types';
import { GpioDriver } from './GpioDriver';
import { DriverStopperError } from '../errors/DriverStopperError';

/**
 * Represents an output GPIO pin.
 * Extends the `GpioDriver` class to provide output-specific functionality.
 */
export class Output extends GpioDriver {
    /**
     * A function to set the value of the GPIO pin.
     * Defaults to a no-op function.
     * @private
     */
    private setter: PinSetter = () => { };

    /**
     * Constructs an `Output` instance.
     *
     * @param gpio - The GPIO pin configuration, including chip and line information.
     * @param options - Configuration options for the output pin.
     */
    constructor(gpio: Gpio, options: GpioOutputOptions = {}) {
        const [setter, cleanup] = bindings.output(gpio.chip, gpio.line);
        super(cleanup);

        this.debug('constructing output with', gpio, options);
        this.setter = setter;
    }

    /**
     * Sets the value of the output GPIO pin.
     *
     * @param value - The value to set on the GPIO pin (`true` for high, `false` for low).
     * @throws {DriverStopperError} If the output has been stopped.
     */
    set value(value: boolean) {
        value = !!value; // Ensure value is boolean
        if (this.stopped) {
            this.debug('output is stopped, throwing error');
            throw new DriverStopperError('Cannot set value on stopped output');
        }
        this.debug('setting output value to', value);
        this.setter(value);
    }
}