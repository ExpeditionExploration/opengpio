"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mocked = exports.bindings = void 0;
const bindings_1 = __importDefault(require("bindings"));
const debug_1 = require("./debug");
const debug = debug_1.debug.extend('bindings');
let bindings;
const mocked = process.env.OPENGPIO_MOCKED === 'true';
exports.mocked = mocked;
if (!mocked) {
    debug('Loading bindings...');
    exports.bindings = bindings = (0, bindings_1.default)('opengpio');
}
else {
    // Mocked bindings
    debug('Using mocked bindings...');
    exports.bindings = bindings = {
        info: () => 'mocked',
        input: () => [() => true, () => { }],
        output: () => [() => { }, () => { }],
        pwm: () => [() => { }, () => { }, () => { }],
        watch: () => [() => true, () => { }],
    };
}
//# sourceMappingURL=bindings.js.map