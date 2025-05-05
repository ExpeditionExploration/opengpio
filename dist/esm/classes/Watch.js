import { Edge } from '../types';
import { bindings } from '../bindings';
import { GpioDriver } from './GpioDriver';
import { DriverStoppedError } from '../errors/DriverStoppedError';
/**
 * Represents a GPIO watcher that monitors edge changes (rising, falling, or both).
 * Extends the `GpioDriver` class to provide event-driven functionality for GPIO inputs.
 */
export class Watch extends GpioDriver {
    /**
     * Constructs a `Watch` instance.
     *
     * @param gpio - The GPIO pin configuration, including chip and line information.
     * @param edge - The edge type to monitor (rising, falling, or both).
     * @param options - Configuration options for the watcher, such as debounce and bias.
     */
    constructor(gpio, edge, options = {}) {
        var _a, _b;
        const [getter, cleanup] = bindings.watch(gpio.chip, gpio.line, (_a = options.debounce) !== null && _a !== void 0 ? _a : 0, (_b = options.bias) !== null && _b !== void 0 ? _b : 0, (value) => {
            this.debug('watcher callback with value', value);
            if (value && (edge === Edge.Rising || edge === Edge.Both)) {
                this.debug('value is true, emitting rise and change');
                // Emits events for a rising edge
                this.emit('change', value);
                this.emit('rise', value);
            }
            else if (!value && (edge === Edge.Falling || edge === Edge.Both)) {
                this.debug('value is false, emitting fall and change');
                // Emits events for a falling edge
                this.emit('change', value);
                this.emit('fall', value);
            }
        });
        super(cleanup);
        this.edge = edge;
        /**
         * A function to retrieve the current value of the GPIO pin.
         * Defaults to a function that always returns `false`.
         * @private
         */
        this.getter = () => false;
        this.debug('constructing watcher with', gpio, edge, options);
        this.getter = getter;
    }
    /**
     * Gets the current value of the GPIO pin being watched.
     *
     * @throws {DriverStoppedError} If the watcher has been stopped.
     * @returns The current value of the GPIO pin (`true` for high, `false` for low).
     */
    get value() {
        this.debug('getting watcher value');
        if (this.stopped) {
            this.debug('watcher is stopped, throwing error');
            throw new DriverStoppedError('Cannot get value from stopped watcher');
        }
        const value = this.getter();
        this.debug('watcher value is', value);
        return value;
    }
}
//# sourceMappingURL=Watch.js.map