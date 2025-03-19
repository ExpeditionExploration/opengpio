import { Edge, Gpio } from '../types';
import { Pwm } from './Pwm';
import { Direction, Pin } from './Pin';
import { Watch } from './Watch';

export class Device {
    board: Record<number, Gpio> = {};
    bcm: Record<string, Gpio> = {};

    input<T = typeof this>(gpio: Gpio | keyof T['board'] | keyof T['bcm'] | number) {
        const gpio = this.getGpioFromIdentifier(identifier);
        return new Pin(gpio, Direction.Input);
    }
    static output(gpio: Gpio | string | number) {
        return new Pin(gpio, Direction.Output);
    }
    static watch(gpio: Gpio | string | number, edge: Edge) {
        return new Watch(gpio, edge);
    }
    static pwm(gpio: Gpio | string | number, dutyCycle: number, frequency: number) {
        return new Pwm(gpio, dutyCycle, frequency);
    }

    private getGpioFromIdentifier(identifier: string | number | gpio): Gpio {
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
