import { bindings } from '../bindings';
import { Gpio, PinSetter, GpioOutputOptions } from '../types';
import { GpioDriver } from './GpioDriver';

export class Output extends GpioDriver {
    private setter: PinSetter = () => { };

    constructor(gpio: Gpio, options: GpioOutputOptions = {}) {
        const [setter, cleanup] = bindings.output(gpio.chip, gpio.line);
        super(cleanup);

        this.debug('constructing output with', gpio, options);
        this.setter = setter;
    }

    set value(value: boolean) {
        value = !!value; // Ensure value is boolean
        if (this.stopped) {
            this.debug('output is stopped, throwing error');
            throw new Error('Cannot set value on stopped output');
        }
        this.debug('setting output value to', value);
        this.setter(value);
    }
}
