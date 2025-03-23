import { bindings } from '../bindings';
import { Gpio, PinGetter, GpioInputOptions } from '../types';
import { GpioDriver } from './GpioDriver';

export class Input extends GpioDriver {
    private getter: PinGetter = () => false;

    constructor(gpio: Gpio, options: GpioInputOptions = {}) {
        const [getter, cleanup] = bindings.input(gpio.chip, gpio.line, options.bias ?? 0)
        super(cleanup);

        this.debug('constructing input with', gpio, options);
        this.getter = getter;
    }

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
