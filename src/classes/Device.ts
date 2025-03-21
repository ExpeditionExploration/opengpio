import { Edge, Gpio, GpioOutputOptions, GpioInputOptions } from '../types';
import { Pwm } from './Pwm';
import { Watch } from './Watch';
import { Input } from './Input';
import { Output } from './Output';
import debug from '../debug';

export class Device {
    static board: Record<number, Gpio> = {};
    static bcm: Record<string, Gpio> = {};
    static logger = debug.extend(this.name);

    static input<T extends typeof Device>(this: T, gpio: Gpio | keyof T['board'] | keyof T['bcm'], options: Omit<GpioInputOptions, 'debounce'> = {}): Input {
        console.log('input', gpio, options);
        this.logger('input', gpio, options);
        const resolvedGpio = this.getGpioFromIdentifier(gpio);
        return new Input(resolvedGpio, options);
    }
    static output<T extends typeof Device>(this: T, gpio: Gpio | keyof T['board'] | keyof T['bcm'], options: GpioOutputOptions = {}): Output {
        const resolvedGpio = this.getGpioFromIdentifier(gpio);
        return new Output(resolvedGpio, options);
    }
    static watch<T extends typeof Device>(this: T,
        gpio: Gpio | keyof T['board'] | keyof T['bcm'],
        edge: Edge,
        options: GpioInputOptions = {}
    ): Watch {
        const resolvedGpio = this.getGpioFromIdentifier(gpio);
        return new Watch(resolvedGpio, edge, options);
    }
    static pwm<T extends typeof Device>(this: T, gpio: Gpio | keyof T['board'] | keyof T['bcm'], dutyCycle: number, frequency: number, options: GpioOutputOptions = {}): Pwm {
        const resolvedGpio = this.getGpioFromIdentifier(gpio);
        return new Pwm(resolvedGpio, dutyCycle, frequency, options);
    }

    private static getGpioFromIdentifier<T extends typeof Device>(identifier: Gpio | keyof T['board'] | keyof T['bcm']): Gpio {
        if (typeof identifier === 'object') {
            return identifier;
        } else if (typeof identifier === 'string') {
            return this.bcm[identifier];
        } else if (typeof identifier === 'number') {
            return this.board[identifier];
        }

        throw new Error('Invalid identifier type');
    }
}
