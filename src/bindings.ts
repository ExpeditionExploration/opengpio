import binding from 'bindings';
import { type OpenGpioBindings } from './types';
let bindings: OpenGpioBindings;

const mocked = process.env.OPENGPIO_MOCKED === 'true';
if (!mocked) {
    bindings = binding('opengpio');
}

if (mocked) {
    // Mocked bindings
    bindings = {
        info: () => 'mocked',
        input: () => [() => true, () => { }],
        output: () => [() => { }, () => { }],
        pwm: () => [() => { }, () => { }, () => { }],
        watch: () => [() => true, () => { }],
    }
}

export { bindings, mocked };
