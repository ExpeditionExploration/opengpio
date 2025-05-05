/// <reference types="debug" />
import { Edge, Gpio, GpioOutputOptions, GpioInputOptions } from '../types';
import { Pwm } from './Pwm';
import { Watch } from './Watch';
import { Input } from './Input';
import { Output } from './Output';
/**
 * Represents a base class for managing GPIO devices.
 * Provides static methods for creating and managing GPIO inputs, outputs, watchers, and PWM signals.
 */
export declare class Device {
    /**
     * A mapping of board pin numbers to GPIO objects.
     */
    static board: Record<number, Gpio>;
    /**
     * A mapping of BCM pin names to GPIO objects.
     */
    static bcm: Record<string, Gpio>;
    /**
     * Retrieves a debug logger scoped to the current class name.
     * @protected
     * @returns A debug logger instance.
     */
    private static _debug;
    protected static get debug(): import("debug").Debugger;
    /**
     * Creates an input GPIO instance.
     *
     * @param gpio - The GPIO identifier (object, board pin, or BCM pin).
     * @param options - Configuration options for the input GPIO.
     * @returns An `Input` instance.
     */
    static input<T extends typeof Device>(this: T, gpio: Gpio | keyof T['board'] | keyof T['bcm'], options?: Omit<GpioInputOptions, 'debounce'>): Input;
    /**
     * Creates an output GPIO instance.
     *
     * @param gpio - The GPIO identifier (object, board pin, or BCM pin).
     * @param options - Configuration options for the output GPIO.
     * @returns An `Output` instance.
     */
    static output<T extends typeof Device>(this: T, gpio: Gpio | keyof T['board'] | keyof T['bcm'], options?: GpioOutputOptions): Output;
    /**
     * Creates a watcher for a GPIO pin to monitor edge changes.
     *
     * @param gpio - The GPIO identifier (object, board pin, or BCM pin).
     * @param edge - The edge type to watch (e.g., rising, falling, or both).
     * @param options - Configuration options for the watcher.
     * @returns A `Watch` instance.
     */
    static watch<T extends typeof Device>(this: T, gpio: Gpio | keyof T['board'] | keyof T['bcm'], edge: Edge, options?: GpioInputOptions): Watch;
    /**
     * Creates a PWM (Pulse Width Modulation) instance for a GPIO pin.
     *
     * @param gpio - The GPIO identifier (object, board pin, or BCM pin).
     * @param dutyCycle - The duty cycle percentage (0-100).
     * @param frequency - The frequency in hertz.
     * @param options - Configuration options for the PWM.
     * @returns A `Pwm` instance.
     */
    static pwm<T extends typeof Device>(this: T, gpio: Gpio | keyof T['board'] | keyof T['bcm'], dutyCycle: number, frequency: number, options?: GpioOutputOptions): Pwm;
    /**
     * Resolves a GPIO identifier to a `Gpio` object.
     *
     * @param identifier - The GPIO identifier (object, board pin, or BCM pin).
     * @returns The resolved `Gpio` object.
     * @throws {Error} If the identifier is invalid or not found.
     * @private
     */
    private static getGpioFromIdentifier;
}
//# sourceMappingURL=Device.d.ts.map