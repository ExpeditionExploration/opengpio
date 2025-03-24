import { bindings } from '../bindings';
import debug from '../debug';
import { CleanupCallback, Gpio, PinGetter, PinSetter, GpioInputOptions } from '../types';

export class Input {
    private getter: PinGetter = () => false;
    private cleanup: CleanupCallback = () => { };
    private stopped: boolean = false;
    private debug = debug.extend(this.constructor.name);

    constructor(gpio: Gpio, options: GpioInputOptions = {}) {
        this.debug('constructing input with', gpio, options);
        const [getter, cleanup] = bindings.input(gpio.chip, gpio.line, options.bias ?? 0)
        this.getter = getter;
        this.cleanup = cleanup;
    }

    stop() {
        this.debug('stopping input, cleaning up');
        if (this.stopped) {
            this.debug('input is already stopped, returning');
            return;
        }
        this.stopped = true;
        this.cleanup();
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
