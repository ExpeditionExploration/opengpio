import { WatchCallback, Gpio, Edge, CleanupCallback, PinGetter, GpioInputOptions } from '../types';
import { bindings } from '../bindings';
import { EventEmitter } from 'events';
import debug from '../debug';

export class Watch extends EventEmitter {
    private getter: PinGetter = () => false;
    private cleanup: CleanupCallback = () => { };
    private stopped: boolean = false;
    private debug = debug.extend(this.constructor.name);

    constructor(
        gpio: Gpio,
        private edge: Edge,
        options: GpioInputOptions = {}
    ) {
        super();
        this.debug('constructing watcher with', gpio, edge, options);
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

        this.getter = getter;
        this.cleanup = cleanup;
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

    stop() {
        this.debug('stopping watcher, cleaning up');
        this.stopped = true;
        this.removeAllListeners();
        this.cleanup();
    }
}
