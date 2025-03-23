import { DutyCycleSetter, FrequencySetter, Gpio, GpioOutputOptions } from "../types";
import { bindings } from '../bindings';
import { GpioDriver } from "./GpioDriver";

export class Pwm extends GpioDriver {
    private dutyCycleSetter: DutyCycleSetter = () => { };
    private frequencySetter: FrequencySetter = () => { };

    constructor(gpio: Gpio, private dutyCycle: number, private frequency: number = 50, options: GpioOutputOptions = {}) {
        const [setDutyCycle, setFrequency, cleanup] = bindings.pwm(gpio.chip, gpio.line, dutyCycle, frequency);
        super(cleanup);

        this.debug('constructing PWM with', gpio, dutyCycle, frequency, options);
        this.dutyCycleSetter = setDutyCycle;
        this.frequencySetter = setFrequency;
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
