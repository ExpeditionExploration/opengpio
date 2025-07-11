import { Gpio, GpioOutputOptions } from '../types';
import { GpioDriver } from './GpioDriver';
/**
 * Represents an output GPIO pin.
 * Extends the `GpioDriver` class to provide output-specific functionality.
 */
export declare class Output extends GpioDriver {
    /**
     * A function to set the value of the GPIO pin.
     * Defaults to a no-op function.
     * @private
     */
    private setter;
    /**
     * Constructs an `Output` instance.
     *
     * @param gpio - The GPIO pin configuration, including chip and line information.
     * @param options - Configuration options for the output pin.
     */
    constructor(gpio: Gpio, options?: GpioOutputOptions);
    private lastValue;
    /**
     * Sets the value of the output GPIO pin.
     *
     * @param value - The value to set on the GPIO pin (`true` for high, `false` for low).
     * @throws {DriverStoppedError} If the output has been stopped.
     */
    set value(value: boolean);
    /**
     * Gets the last value set on the output GPIO pin.
     * @returns {boolean | null} The last value set on the GPIO pin, or `null` if no value has been set.
     * @throws {DriverStoppedError} If the output has been stopped.
     */
    get value(): boolean | null;
}
//# sourceMappingURL=Output.d.ts.map