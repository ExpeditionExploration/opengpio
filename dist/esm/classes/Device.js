import { Edge } from '../types';
import { Pwm } from './Pwm';
import { Watch } from './Watch';
import { Input } from './Input';
import { Output } from './Output';
import debug from '../debug';
/**
 * Represents a base class for managing GPIO devices.
 * Provides static methods for creating and managing GPIO inputs, outputs, watchers, and PWM signals.
 */
export class Device {
    /**
     * Retrieves a debug logger scoped to the current class name.
     * @protected
     * @returns A debug logger instance.
     */
    static get debug() {
        return debug.extend(this.name);
    }
    /**
     * Creates an input GPIO instance.
     *
     * @param gpio - The GPIO identifier (object, board pin, or BCM pin).
     * @param options - Configuration options for the input GPIO.
     * @returns An `Input` instance.
     */
    static input(gpio, options = {}) {
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
    static output(gpio, options = {}) {
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
    static watch(gpio, edge, options = {}) {
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
    static pwm(gpio, dutyCycle, frequency, options = {}) {
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
    static getGpioFromIdentifier(identifier) {
        this.debug('fetching GPIO reference from identifier:', identifier);
        if (typeof identifier === 'object') {
            this.debug('return GPIO object:', identifier);
            return identifier;
        }
        else if (typeof identifier === 'string') {
            const bcmGpio = this.bcm[identifier];
            this.debug(`returning GPIO reference from BCM key "${identifier}":`, bcmGpio);
            return bcmGpio;
        }
        else if (typeof identifier === 'number') {
            const boardGpio = this.board[identifier];
            this.debug(`returning GPIO reference with board key ${identifier}:`, boardGpio);
            return boardGpio;
        }
        throw new Error('Invalid identifier type');
    }
}
/**
 * A mapping of board pin numbers to GPIO objects.
 */
Device.board = {};
/**
 * A mapping of BCM pin names to GPIO objects.
 */
Device.bcm = {};
//# sourceMappingURL=Device.js.map