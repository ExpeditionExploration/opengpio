import binding from 'bindings';
import { type OpenGpioBindings } from './types';
import debug from './debug';
const logger = debug.extend('bindings');

let bindings: OpenGpioBindings = {} as any;

const mocked = process.env.OPENGPIO_MOCKED === 'true';
if (!mocked) {
    logger('Loading bindings...');
    bindings = binding('opengpio');
} else {
    logger('Using mocked bindings...');
    bindings.info = () => 'mocked';
    bindings.input = () => [() => true, () => { }];
    bindings.output = () => [() => { }, () => { }];
    bindings.pwm = () => [() => { }, () => { }, () => { }];
    bindings.watch = () => [() => true, () => { }];
}

export { bindings, mocked };
