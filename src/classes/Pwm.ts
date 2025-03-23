import { DutyCycleSetter, FrequencySetter, Gpio, GpioOutputOptions } from "../types";
import { bindings } from '../bindings';
import { GpioDriver } from "./GpioDriver";

/**
 * Represents a PWM (Pulse Width Modulation) GPIO pin.
 * Extends the `GpioDriver` class to provide PWM-specific functionality.
 */
export class Pwm extends GpioDriver {
    /**
     * A function to set the duty cycle of the PWM pin.
     * Defaults to a no-op function.
     * @private
     */
    private dutyCycleSetter: DutyCycleSetter = () => { };

    /**
     * A function to set the frequency of the PWM pin.
     * Defaults to a no-op function.
     * @private
     */
    private frequencySetter: FrequencySetter = () => { };

    /**
     * Constructs a `Pwm` instance.
     *
     * @param gpio - The GPIO pin configuration, including chip and line information.
     * @param dutyCycle - The initial duty cycle percentage (0-100).
     * @param frequency - The initial frequency in hertz. Defaults to 50 Hz.
     * @param options - Configuration options for the PWM pin.
     */
    constructor(gpio: Gpio, private dutyCycle: number, private frequency: number = 50, options: GpioOutputOptions = {}) {
        const [setDutyCycle, setFrequency, cleanup] = bindings.pwm(gpio.chip, gpio.line, dutyCycle, frequency);
        super(cleanup);

        this.debug('constructing PWM with', gpio, dutyCycle, frequency, options);
        this.dutyCycleSetter = setDutyCycle;
        this.frequencySetter = setFrequency;
    }

    /**
     * Sets the duty cycle of the PWM pin.
     *
     * @param dutyCycle - The new duty cycle percentage (0-100).
     * @throws {Error} If the PWM has been stopped.
     */
    setDutyCycle(dutyCycle: number) {
        this.debug('setting PWM duty cycle to', dutyCycle);
        if (this.stopped) {
            throw new Error('Cannot set duty cycle on stopped PWM');
        }
        this.dutyCycle = dutyCycle;
        this.dutyCycleSetter(dutyCycle);
    }

    /**
     * Sets the frequency of the PWM pin.
     *
     * @param frequency - The new frequency in hertz.
     * @throws {Error} If the PWM has been stopped.
     */
    setFrequency(frequency: number) {
        this.debug('setting PWM frequency to', frequency);
        if (this.stopped) {
            throw new Error('Cannot set frequency on stopped PWM');
        }
        this.frequency = frequency;
        this.frequencySetter(frequency);
    }
}
