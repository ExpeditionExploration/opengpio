/// <reference types="debug" />
/// <reference types="node" />
import EventEmitter from "events";
import { CleanupCallback } from "../types";
/**
 * Represents a base class for managing GPIO drivers.
 * Extends `EventEmitter` to provide event-driven functionality.
 * Automatically registers drivers for cleanup before the process exits.
 */
export declare class GpioDriver extends EventEmitter {
    private readonly __cleanup;
    /**
     * Indicates whether the driver has been stopped.
     * @private
     */
    private __stopped;
    /**
     * Constructs a new `GpioDriver` instance.
     *
     * @param __cleanup - A callback function to clean up resources when the driver is stopped.
     */
    constructor(__cleanup: CleanupCallback);
    /**
     * Retrieves a debug logger scoped to the current class name.
     * @protected
     * @returns A debug logger instance.
     */
    protected get debug(): import("debug").Debugger;
    /**
     * Indicates whether the driver has been stopped.
     *
     * @returns `true` if the driver has been stopped; otherwise, `false`.
     */
    get stopped(): boolean;
    /**
     * Stops the driver and performs cleanup.
     * If the driver is already stopped, this method does nothing.
     */
    stop(): void;
}
//# sourceMappingURL=GpioDriver.d.ts.map