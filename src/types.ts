/**
 * Represents the edge type for GPIO events.
 * - `Rising`: Triggered on a rising edge (low to high).
 * - `Falling`: Triggered on a falling edge (high to low).
 * - `Both`: Triggered on both rising and falling edges.
 */
export enum Edge {
    Rising = 1,
    Falling = -1,
    Both = 0
}

/**
 * Represents a GPIO pin configuration.
 */
export type Gpio = {
    /** The GPIO chip number. */
    chip: number;
    /** The GPIO line number. */
    line: number;
};

/**
 * Represents the bias configuration for a GPIO pin.
 * - `Disabled`: No bias is applied.
 * - `PullUp`: Pull-up resistor is enabled.
 * - `PullDown`: Pull-down resistor is enabled.
 */
export enum Bias {
    // AsIs = 1,
    // Unknown = 2,
    Disabled = 3,
    PullUp = 4,
    PullDown = 5
}

/**
 * A function to set the duty cycle of a PWM pin.
 * @param dutyCycle - The duty cycle (0-1), where 1 is 100%.
 */
export type DutyCycleSetter = (dutyCycle: number) => void;

/**
 * A function to set the frequency of a PWM pin.
 * @param frequency - The frequency in hertz.
 */
export type FrequencySetter = (frequency: number) => void;

/**
 * A callback function to clean up resources.
 */
export type CleanupCallback = () => void;

/**
 * A function to set the value of a GPIO pin.
 * @param value - The value to set (`true` for high, `false` for low).
 */
export type PinSetter = (value: boolean) => void;

/**
 * A function to retrieve the current value of a GPIO pin.
 * @returns The current value of the GPIO pin (`true` for high, `false` for low).
 */
export type PinGetter = () => boolean;

/**
 * A callback function triggered by GPIO watch events.
 * @param value - The value of the GPIO pin (`true` for high, `false` for low).
 */
export type WatchCallback = (value: boolean) => void;

/**
 * Represents the bindings provided by the native module for GPIO operations.
 */
export type OpenGpioBindings = {
    /**
     * Retrieves information about the native module.
     * @returns A string containing module information.
     */
    info: () => string;

    /**
     * Configures a GPIO pin as an input.
     * @param chip - The GPIO chip number.
     * @param line - The GPIO line number.
     * @param bias - The bias configuration for the pin.
     * @returns A tuple containing a `PinGetter` and a `CleanupCallback`.
     */
    input: (chip: number, line: number, bias: number) => [PinGetter, CleanupCallback];

    /**
     * Configures a GPIO pin as an output.
     * @param chip - The GPIO chip number.
     * @param line - The GPIO line number.
     * @returns A tuple containing a `PinSetter` and a `CleanupCallback`.
     */
    output: (chip: number, line: number) => [PinSetter, CleanupCallback];

    /**
     * Configures a GPIO pin to watch for edge changes.
     * @param chip - The GPIO chip number.
     * @param line - The GPIO line number.
     * @param bias - The bias configuration for the pin.
     * @param debounce - The debounce time in milliseconds.
     * @param callback - A callback function triggered on edge changes.
     * @returns A tuple containing a `PinGetter` and a `CleanupCallback`.
     */
    watch: (
        chip: number,
        line: number,
        bias: number,
        debounce: number,
        callback: WatchCallback,
    ) => [PinGetter, CleanupCallback];

    /**
     * Configures a GPIO pin for PWM (Pulse Width Modulation).
     * @param chip - The GPIO chip number.
     * @param line - The GPIO line number.
     * @param dutyCycle - The initial duty cycle (0-1), where 1 is 100%.
     * @param frequency - The initial frequency in hertz.
     * @returns A tuple containing a `DutyCycleSetter`, `FrequencySetter`, and a `CleanupCallback`.
     */
    pwm: (
        chip: number,
        line: number,
        dutyCycle: number,
        frequency: number
    ) => [DutyCycleSetter, FrequencySetter, CleanupCallback];
};

/**
 * Configuration options for a GPIO input pin.
 */
export type GpioInputOptions = {
    /** The debounce time in milliseconds. */
    debounce?: number;
    /** The bias configuration for the pin. */
    bias?: Bias;
};

/**
 * Configuration options for a GPIO output pin.
 */
export type GpioOutputOptions = {};