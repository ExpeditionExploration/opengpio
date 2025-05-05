import EventEmitter from "events";
import { debug } from "../debug";
const drivers = new Set();
process.on('beforeExit', () => {
    debug('Cleaning up all drivers');
    drivers.forEach((driver) => driver.stop());
});
/**
 * Represents a base class for managing GPIO drivers.
 * Extends `EventEmitter` to provide event-driven functionality.
 * Automatically registers drivers for cleanup before the process exits.
 */
export class GpioDriver extends EventEmitter {
    /**
     * Constructs a new `GpioDriver` instance.
     *
     * @param __cleanup - A callback function to clean up resources when the driver is stopped.
     */
    constructor(__cleanup) {
        super();
        this.__cleanup = __cleanup;
        /**
         * Indicates whether the driver has been stopped.
         * @private
         */
        this.__stopped = false;
        /**
         * Retrieves a debug logger scoped to the current class name.
         * @protected
         * @returns A debug logger instance.
         */
        this._debug = undefined;
        this.debug(`registering new ${this.constructor.name} gpio driver`);
        drivers.add(this);
    }
    get debug() {
        if (!this._debug) {
            // This is done so that that name is the name of the class that extends Device.
            this._debug = debug.extend(this.constructor.name);
        }
        return this._debug;
    }
    /**
     * Indicates whether the driver has been stopped.
     *
     * @returns `true` if the driver has been stopped; otherwise, `false`.
     */
    get stopped() {
        this.debug(`${this.constructor.name} getting stopped value`, this.__stopped);
        return this.__stopped;
    }
    /**
     * Stops the driver and performs cleanup.
     * If the driver is already stopped, this method does nothing.
     */
    stop() {
        this.debug('stopping driver, cleaning up');
        if (this.__stopped) {
            this.debug(`${this.constructor.name} driver is already stopped, returning`);
            return;
        }
        this.__stopped = true;
        this.__cleanup();
    }
}
//# sourceMappingURL=GpioDriver.js.map