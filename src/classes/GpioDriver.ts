import EventEmitter from "events";
import debug from "../debug";
import { CleanupCallback } from "../types";

const drivers: Set<GpioDriver> = new Set();
process.on('beforeExit', () => {
    debug('Cleaning up all drivers');
    drivers.forEach((driver) => driver.stop());
});

export class GpioDriver extends EventEmitter {
    constructor(private readonly __cleanup: CleanupCallback) {
        super();
        this.debug(`registering new ${this.constructor.name} gpio driver`);
        drivers.add(this);
    }

    protected get debug() {
        // Need to use a getter here to get the logger with the correct sub class name.
        return debug.extend(this.constructor.name);
    }

    private __stopped: boolean = false;
    get stopped(): boolean {
        this.debug(`${this.constructor.name} getting stopped value`, this.__stopped);
        return this.__stopped;
    }

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