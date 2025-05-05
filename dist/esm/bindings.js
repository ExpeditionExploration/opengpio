import binding from 'bindings';
import { debug as debugLogger } from './debug';
const debug = debugLogger.extend('bindings');
let bindings;
const mocked = process.env.OPENGPIO_MOCKED === 'true';
if (!mocked) {
    debug('Loading bindings...');
    bindings = binding('opengpio');
}
else {
    // Mocked bindings
    debug('Using mocked bindings...');
    bindings = {
        info: () => 'mocked',
        input: () => [() => true, () => { }],
        output: () => [() => { }, () => { }],
        pwm: () => [() => { }, () => { }, () => { }],
        watch: () => [() => true, () => { }],
    };
}
export { bindings, mocked };
//# sourceMappingURL=bindings.js.map