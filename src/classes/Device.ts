import { Edge, Gpio, GpioOutputOptions, GpioInputOptions } from '../types';
import { Pwm } from './Pwm';
import { Watch } from './Watch';
import { Input } from './Input';
import { Output } from './Output';
import debug from '../debug';

export class Device {
    static board: Record<number, Gpio> = {};
    static bcm: Record<string, Gpio> = {};

    protected static get debug() {
        // Need to use a getter here to get the logger with the correct sub class name.
        return debug.extend(this.name);
    }

    static input<T extends typeof Device>(this: T, gpio: Gpio | keyof T['board'] | keyof T['bcm'], options: Omit<GpioInputOptions, 'debounce'> = {}): Input {
        const resolvedGpio = this.getGpioFromIdentifier(gpio);
        this.debug('starting input with', resolvedGpio, options);
        return new Input(resolvedGpio, options);
    }
    static output<T extends typeof Device>(this: T, gpio: Gpio | keyof T['board'] | keyof T['bcm'], options: GpioOutputOptions = {}): Output {
        const resolvedGpio = this.getGpioFromIdentifier(gpio);
        this.debug('starting output with', resolvedGpio, options);
        return new Output(resolvedGpio, options);
    }
    static watch<T extends typeof Device>(this: T,
        gpio: Gpio | keyof T['board'] | keyof T['bcm'],
        edge: Edge,
        options: GpioInputOptions = {}
    ): Watch {
        const resolvedGpio = this.getGpioFromIdentifier(gpio);
        this.debug(`starting watcher on edge "${Edge[edge]}" with`, resolvedGpio, options);
        return new Watch(resolvedGpio, edge, options);
    }
    static pwm<T extends typeof Device>(this: T,
        gpio: Gpio | keyof T['board'] | keyof T['bcm'],
        dutyCycle: number,
        frequency: number,
        options: GpioOutputOptions = {}
    ): Pwm {
        const resolvedGpio = this.getGpioFromIdentifier(gpio);
        this.debug(`starting PWM with duty cycle ${dutyCycle} and frequency ${frequency}Hz with`, resolvedGpio, options);
        return new Pwm(resolvedGpio, dutyCycle, frequency, options);
    }

    private static getGpioFromIdentifier<T extends typeof Device>(identifier: Gpio | keyof T['board'] | keyof T['bcm']): Gpio {
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
