import { Gpio, Edge, GpioInputOptions } from '../types';
import { GpioDriver } from './GpioDriver';
/**
 * Represents a GPIO watcher that monitors edge changes (rising, falling, or both).
 * Extends the `GpioDriver` class to provide event-driven functionality for GPIO inputs.
 */
export declare class Watch extends GpioDriver {
    private edge;
    /**
     * A function to retrieve the current value of the GPIO pin.
     * Defaults to a function that always returns `false`.
     * @private
     */
    private getter;
    /**
     * Constructs a `Watch` instance.
     *
     * @param gpio - The GPIO pin configuration, including chip and line information.
     * @param edge - The edge type to monitor (rising, falling, or both).
     * @param options - Configuration options for the watcher, such as debounce and bias.
     */
    constructor(gpio: Gpio, edge: Edge, options?: GpioInputOptions);
    /**
     * Gets the current value of the GPIO pin being watched.
     *
     * @throws {DriverStoppedError} If the watcher has been stopped.
     * @returns The current value of the GPIO pin (`true` for high, `false` for low).
     */
    get value(): boolean;
}
