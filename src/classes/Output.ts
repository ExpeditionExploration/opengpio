import debug from '../debug';
import { bindings } from '../bindings';

import { CleanupCallback, Gpio, PinSetter, GpioOutputOptions } from '../types';

export class Output {
    private setter: PinSetter = () => { };
    private cleanup: CleanupCallback = () => { };
    private stopped: boolean = false;
    private debug = debug.extend(this.constructor.name);

    constructor(gpio: Gpio, options: GpioOutputOptions = {}) {
        this.debug('constructing output with', gpio, options);
        const [setter, cleanup] = bindings.output(gpio.chip, gpio.line)
        this.setter = setter;
        this.cleanup = cleanup;
    }

    stop() {
        this.debug('stopping output, cleaning up');
        if (this.stopped) {
            this.debug('output is stopped, throwing error');
            throw new Error('Cannot get value from stopped output');
        }
        this.stopped = true;
        this.cleanup();
    }

    set value(value: boolean) {
        value = !!value; // Ensure value is boolean
        this.debug('setting output value to', value);
        this.setter(value);
    }
}
