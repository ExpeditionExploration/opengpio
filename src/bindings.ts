import binding from 'bindings';
import { type OpenGpioBindings } from './types';
let bindings: OpenGpioBindings = {} as any;

const mocked = process.env.OPENGPIO_MOCKED === 'true';
if (!mocked) {
    bindings = binding('opengpio');
}

if (mocked) {
    bindings.info = () => 'mocked';
    bindings.input = () => [() => true, () => { }];
    bindings.output = () => [() => { }, () => { }];
    bindings.pwm = () => [() => { }, () => { }, () => { }];
    bindings.watch = () => [() => true, () => { }];
}

export { bindings, mocked };
