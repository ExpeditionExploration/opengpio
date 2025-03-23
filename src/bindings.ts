import binding from 'bindings';
import { type OpenGpioBindings } from './types';
import debug from './debug';
const logger = debug.extend('bindings');
let bindings: OpenGpioBindings;

const mocked = process.env.OPENGPIO_MOCKED === 'true';
if (!mocked) {
    logger('Loading bindings...');
    bindings = binding('opengpio');
} else {
    // Mocked bindings
    logger('Using mocked bindings...');
    bindings = {
        info: () => 'mocked',
        input: () => [() => true, () => { }],
        output: () => [() => { }, () => { }],
        pwm: () => [() => { }, () => { }, () => { }],
        watch: () => [() => true, () => { }],
    }
}

export { bindings, mocked };
