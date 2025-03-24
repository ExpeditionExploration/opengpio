import { bindings } from '../bindings';
import { Gpio, PinGetter, GpioInputOptions } from '../types';
import { GpioDriver } from './GpioDriver';

/**
 * Represents an input GPIO pin.
 * Extends the `GpioDriver` class to provide input-specific functionality.
 */
export class Input extends GpioDriver {
    /**
     * A function to retrieve the current value of the GPIO pin.
     * Defaults to a function that always returns `false`.
     */
    private getter: PinGetter = () => false;

    /**
     * Constructs an `Input` instance.
     *
     * @param gpio - The GPIO pin configuration, including chip and line information.
     * @param options - Configuration options for the input pin, such as bias.
     */
    constructor(gpio: Gpio, options: GpioInputOptions = {}) {
        const [getter, cleanup] = bindings.input(gpio.chip, gpio.line, options.bias ?? 0);
        super(cleanup);

        this.debug('constructing input with', gpio, options);
        this.getter = getter;
    }

    /**
     * Gets the current value of the input pin.
     *
     * @throws {Error} If the input has been stopped.
     * @returns The current value of the GPIO pin (`true` for high, `false` for low).
     */
    get value() {
        this.debug('getting input value');
        if (this.stopped) {
            this.debug('input is stopped, throwing error');
            throw new Error('Cannot get value from stopped input');
        }
        const value = this.getter();
        this.debug('input value is', value);
        return value;
    }
}