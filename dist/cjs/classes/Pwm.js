"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pwm = void 0;
const bindings_1 = require("../bindings");
const GpioDriver_1 = require("./GpioDriver");
const DriverStoppedError_1 = require("../errors/DriverStoppedError");
/**
 * Represents a PWM (Pulse Width Modulation) GPIO pin.
 * Extends the `GpioDriver` class to provide PWM-specific functionality.
 */
class Pwm extends GpioDriver_1.GpioDriver {
    /**
     * Constructs a `Pwm` instance.
     *
     * @param gpio - The GPIO pin configuration, including chip and line information.
     * @param dutyCycle - The initial duty cycle percentage (0-100).
     * @param frequency - The initial frequency in hertz. Defaults to 50 Hz.
     * @param options - Configuration options for the PWM pin.
     */
    constructor(gpio, dutyCycle, frequency = 50, options = {}) {
        const [setDutyCycle, setFrequency, cleanup] = bindings_1.bindings.pwm(gpio.chip, gpio.line, dutyCycle, frequency);
        super(cleanup);
        this.dutyCycle = dutyCycle;
        this.frequency = frequency;
        /**
         * A function to set the duty cycle of the PWM pin.
         * Defaults to a no-op function.
         * @private
         */
        this.dutyCycleSetter = () => { };
        /**
         * A function to set the frequency of the PWM pin.
         * Defaults to a no-op function.
         * @private
         */
        this.frequencySetter = () => { };
        this.debug('constructing PWM with', gpio, dutyCycle, frequency, options);
        this.dutyCycleSetter = setDutyCycle;
        this.frequencySetter = setFrequency;
    }
    /**
     * Sets the duty cycle of the PWM pin.
     *
     * @param dutyCycle - The new duty cycle percentage (0-100).
     * @throws {DriverStoppedError} If the PWM has been stopped.
     */
    setDutyCycle(dutyCycle) {
        this.debug('setting PWM duty cycle to', dutyCycle);
        if (this.stopped) {
            this.debug('pwm is stopped, throwing error');
            throw new DriverStoppedError_1.DriverStoppedError('Cannot set duty cycle on stopped PWM');
        }
        this.dutyCycle = dutyCycle;
        this.dutyCycleSetter(dutyCycle);
    }
    /**
     * Sets the frequency of the PWM pin.
     *
     * @param frequency - The new frequency in hertz.
     * @throws {DriverStoppedError} If the PWM has been stopped.
     */
    setFrequency(frequency) {
        this.debug('setting PWM frequency to', frequency);
        if (this.stopped) {
            this.debug('pwm is stopped, throwing error');
            throw new DriverStoppedError_1.DriverStoppedError('Cannot set frequency on stopped PWM');
        }
        this.frequency = frequency;
        this.frequencySetter(frequency);
    }
}
exports.Pwm = Pwm;
//# sourceMappingURL=Pwm.js.map