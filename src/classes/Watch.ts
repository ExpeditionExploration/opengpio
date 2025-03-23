import { Gpio, Edge, PinGetter, GpioInputOptions } from '../types';
import { bindings } from '../bindings';
import { GpioDriver } from './GpioDriver';

export class Watch extends GpioDriver {
    private getter: PinGetter = () => false;

    constructor(
        gpio: Gpio,
        private edge: Edge,
        options: GpioInputOptions = {}
    ) {
        const [getter, cleanup] = bindings.watch(gpio.chip, gpio.line, options.debounce ?? 0, options.bias ?? 0, (value) => {
            this.debug('watcher callback with value', value);
            if (value && (edge === Edge.Rising || edge === Edge.Both)) {
                this.debug('value is true, emitting rise and change');
                // Has risen to true
                this.emit('change', value);
                this.emit('rise', value);
            } else if (!value && (edge === Edge.Falling || edge === Edge.Both)) {
                this.debug('value is false, emitting fall and change');
                // Has fallen to false
                this.emit('change', value);
                this.emit('fall', value);
            }
        });
        super(cleanup);

        this.debug('constructing watcher with', gpio, edge, options);
        this.getter = getter;
    }

    get value() {
        this.debug('getting watcher value');
        if (this.stopped) {
            this.debug('watcher is stopped, throwing error');
            throw new Error('Cannot get value from stopped watcher');
        }
        const value = this.getter();
        this.debug('watcher value is', value);
        return value;
    }
}
