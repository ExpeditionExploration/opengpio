"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GpioDriver = void 0;
const events_1 = __importDefault(require("events"));
const debug_1 = __importDefault(require("../debug"));
const drivers = new Set();
process.on('beforeExit', () => {
    (0, debug_1.default)('Cleaning up all drivers');
    drivers.forEach((driver) => driver.stop());
});
/**
 * Represents a base class for managing GPIO drivers.
 * Extends `EventEmitter` to provide event-driven functionality.
 * Automatically registers drivers for cleanup before the process exits.
 */
class GpioDriver extends events_1.default {
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
        this.debug(`registering new ${this.constructor.name} gpio driver`);
        drivers.add(this);
    }
    /**
     * Retrieves a debug logger scoped to the current class name.
     * @protected
     * @returns A debug logger instance.
     */
    get debug() {
        // Need to use a getter here to get the logger with the correct subclass name.
        return debug_1.default.extend(this.constructor.name);
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
exports.GpioDriver = GpioDriver;
//# sourceMappingURL=GpioDriver.js.map