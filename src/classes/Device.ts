import { Edge, Gpio, GpioOutputOptions, GpioInputOptions } from '../types';
import { Pwm } from './Pwm';
import { Watch } from './Watch';
import { Input } from './Input';
import { Output } from './Output';
import { debug } from '../debug';

/**
 * Represents a base class for managing GPIO devices.
 * Provides static methods for creating and managing GPIO inputs, outputs, watchers, and PWM signals.
 */
export class Device {
    /**
     * A mapping of board pin numbers to GPIO objects.
     */
    static board: Record<number, Gpio> = {};

    /**
     * A mapping of BCM pin names to GPIO objects.
     */
    static bcm: Record<string, Gpio> = {};

    /**
     * Retrieves a debug logger scoped to the current class name.
     * @protected
     * @returns A debug logger instance.
     */
    private static _debug: typeof debug | undefined = undefined;
    protected static get debug() {
        if (!this._debug) {
            // This is done so that that name is the name of the class that extends Device.
            this._debug = debug.extend(this.name);
        }

        return this._debug;
    }

    /**
     * Creates an input GPIO instance.
     *
     * @param gpio - The GPIO identifier (object, board pin, or BCM pin).
     * @param options - Configuration options for the input GPIO.
     * @returns An `Input` instance.
     */
    static input<T extends typeof Device>(
        this: T,
        gpio: Gpio | keyof T['board'] | keyof T['bcm'],
        options: Omit<GpioInputOptions, 'debounce'> = {}
    ): Input {
        const resolvedGpio = this.getGpioFromIdentifier(gpio);
        this.debug('starting input with', resolvedGpio, options);
        return new Input(resolvedGpio, options);
    }

    /**
     * Creates an output GPIO instance.
     *
     * @param gpio - The GPIO identifier (object, board pin, or BCM pin).
     * @param options - Configuration options for the output GPIO.
     * @returns An `Output` instance.
     */
    static output<T extends typeof Device>(
        this: T,
        gpio: Gpio | keyof T['board'] | keyof T['bcm'],
        options: GpioOutputOptions = {}
    ): Output {
        const resolvedGpio = this.getGpioFromIdentifier(gpio);
        this.debug('starting output with', resolvedGpio, options);
        return new Output(resolvedGpio, options);
    }

    /**
     * Creates a watcher for a GPIO pin to monitor edge changes.
     *
     * @param gpio - The GPIO identifier (object, board pin, or BCM pin).
     * @param edge - The edge type to watch (e.g., rising, falling, or both).
     * @param options - Configuration options for the watcher.
     * @returns A `Watch` instance.
     */
    static watch<T extends typeof Device>(
        this: T,
        gpio: Gpio | keyof T['board'] | keyof T['bcm'],
        edge: Edge,
        options: GpioInputOptions = {}
    ): Watch {
        const resolvedGpio = this.getGpioFromIdentifier(gpio);
        this.debug(`starting watcher on edge "${Edge[edge]}" with`, resolvedGpio, options);
        return new Watch(resolvedGpio, edge, options);
    }

    /**
     * Creates a PWM (Pulse Width Modulation) instance for a GPIO pin.
     *
     * @param gpio - The GPIO identifier (object, board pin, or BCM pin).
     * @param dutyCycle - The duty cycle percentage (0-100).
     * @param frequency - The frequency in hertz.
     * @param options - Configuration options for the PWM.
     * @returns A `Pwm` instance.
     */
    static pwm<T extends typeof Device>(
        this: T,
        gpio: Gpio | keyof T['board'] | keyof T['bcm'],
        dutyCycle: number,
        frequency: number,
        options: GpioOutputOptions = {}
    ): Pwm {
        const resolvedGpio = this.getGpioFromIdentifier(gpio);
        this.debug(`starting PWM with duty cycle ${dutyCycle} and frequency ${frequency}Hz with`, resolvedGpio, options);
        return new Pwm(resolvedGpio, dutyCycle, frequency, options);
    }

    /**
     * Resolves a GPIO identifier to a `Gpio` object.
     *
     * @param identifier - The GPIO identifier (object, board pin, or BCM pin).
     * @returns The resolved `Gpio` object.
     * @throws {Error} If the identifier is invalid or not found.
     * @private
     */
    private static getGpioFromIdentifier<T extends typeof Device>(
        identifier: Gpio | keyof T['board'] | keyof T['bcm']
    ): Gpio {
        this.debug('fetching GPIO reference from identifier:', identifier);
        if (typeof identifier === 'object') {
            this.debug('return GPIO object:', identifier);
            return identifier;
        } else if (typeof identifier === 'string') {
            const bcmGpio = this.bcm[identifier];
            this.debug(`returning GPIO reference from BCM key "${identifier}":`, bcmGpio);
            return bcmGpio;
        } else if (typeof identifier === 'number') {
            const boardGpio = this.board[identifier];
            this.debug(`returning GPIO reference with board key ${identifier}:`, boardGpio);
            return boardGpio;
        }

        throw new Error('Invalid identifier type');
    }
}