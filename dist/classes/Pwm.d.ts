import { Gpio, GpioOutputOptions } from "../types";
import { GpioDriver } from "./GpioDriver";
/**
 * Represents a PWM (Pulse Width Modulation) GPIO pin.
 * Extends the `GpioDriver` class to provide PWM-specific functionality.
 */
export declare class Pwm extends GpioDriver {
    private dutyCycle;
    private frequency;
    /**
     * A function to set the duty cycle of the PWM pin.
     * Defaults to a no-op function.
     * @private
     */
    private dutyCycleSetter;
    /**
     * A function to set the frequency of the PWM pin.
     * Defaults to a no-op function.
     * @private
     */
    private frequencySetter;
    /**
     * Constructs a `Pwm` instance.
     *
     * @param gpio - The GPIO pin configuration, including chip and line information.
     * @param dutyCycle - The initial duty cycle percentage (0-100).
     * @param frequency - The initial frequency in hertz. Defaults to 50 Hz.
     * @param options - Configuration options for the PWM pin.
     */
    constructor(gpio: Gpio, dutyCycle: number, frequency?: number, options?: GpioOutputOptions);
    /**
     * Sets the duty cycle of the PWM pin.
     *
     * @param dutyCycle - The new duty cycle percentage (0-100).
     * @throws {DriverStoppedError} If the PWM has been stopped.
     */
    setDutyCycle(dutyCycle: number): void;
    /**
     * Sets the frequency of the PWM pin.
     *
     * @param frequency - The new frequency in hertz.
     * @throws {DriverStoppedError} If the PWM has been stopped.
     */
    setFrequency(frequency: number): void;
}
