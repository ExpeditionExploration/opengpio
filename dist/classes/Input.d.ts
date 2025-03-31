import { Gpio, GpioInputOptions } from '../types';
import { GpioDriver } from './GpioDriver';
/**
 * Represents an input GPIO pin.
 * Extends the `GpioDriver` class to provide input-specific functionality.
 */
export declare class Input extends GpioDriver {
    /**
     * A function to retrieve the current value of the GPIO pin.
     * Defaults to a function that always returns `false`.
     */
    private getter;
    /**
     * Constructs an `Input` instance.
     *
     * @param gpio - The GPIO pin configuration, including chip and line information.
     * @param options - Configuration options for the input pin, such as bias.
     */
    constructor(gpio: Gpio, options?: GpioInputOptions);
    /**
     * Gets the current value of the input pin.
     *
     * @throws {DriverStoppedError} If the input has been stopped.
     * @returns The current value of the GPIO pin (`true` for high, `false` for low).
     */
    get value(): boolean;
}
