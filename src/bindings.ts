import binding from 'bindings';
import { type OpenGpioBindings } from './types';
import { default as debugLogger } from './debug';
const debug = debugLogger.extend('bindings');

let bindings: OpenGpioBindings = {} as any;

const mocked = process.env.OPENGPIO_MOCKED === 'true';
if (!mocked) {
    debug('Loading bindings...');
    bindings = binding('opengpio');
} else {
    debug('Using mocked bindings...');
    bindings.info = () => 'mocked';
    bindings.input = () => [() => true, () => { }];
    bindings.output = () => [() => { }, () => { }];
    bindings.pwm = () => [() => { }, () => { }, () => { }];
    bindings.watch = () => [() => true, () => { }];
}

export { bindings, mocked };
