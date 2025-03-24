import { CleanupCallback, DutyCycleSetter, FrequencySetter, Gpio, GpioOutputOptions } from "../types";
import { bindings } from '../bindings';
import debug from "../debug";

export class Pwm {
    private dutyCycleSetter: DutyCycleSetter = () => { };
    private frequencySetter: FrequencySetter = () => { };
    private cleanup: CleanupCallback = () => { };
    private stopped: boolean = false;
    private debug = debug.extend(this.constructor.name);


    constructor(gpio: Gpio, private dutyCycle: number, private frequency: number = 50, options: GpioOutputOptions = {}) {
        this.debug('constructing PWM with', gpio, dutyCycle, frequency, options);
        const [setDutyCycle, setFrequency, cleanup] = bindings.pwm(gpio.chip, gpio.line, dutyCycle, frequency);
        this.dutyCycleSetter = setDutyCycle;
        this.frequencySetter = setFrequency;
        this.cleanup = cleanup;
    }

    stop() {
        this.debug('stopping PWM, cleaning up');
        if (this.stopped) {
            this.debug('PWM is already stopped, returning');
            return;
        }
        this.stopped = true;
        this.cleanup();
    }

    setDutyCycle(dutyCycle: number) {
        this.debug('setting PWM duty cycle to', dutyCycle);
        if (this.stopped) {
            throw new Error('Cannot set duty cycle on stopped PWM');
        }
        this.dutyCycle = dutyCycle;
        this.dutyCycleSetter(dutyCycle);
    }

    setFrequency(frequency: number) {
        this.debug('setting PWM frequency to', frequency);
        if (this.stopped) {
            throw new Error('Cannot set frequency on stopped PWM');
        }
        this.frequency = frequency;
        this.frequencySetter(frequency);
    }
}