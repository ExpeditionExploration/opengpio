import { Input } from './Input';
import { bindings } from '../bindings';
import { Bias, Gpio, GpioInputOptions } from '../types';

jest.mock('../bindings', () => ({
    bindings: {
        input: jest.fn(),
    },
}));

describe('Input', () => {
    let mockGetter: jest.Mock;
    let mockCleanup: jest.Mock;
    let gpio: Gpio;

    beforeEach(() => {
        mockGetter = jest.fn().mockReturnValue(false);
        mockCleanup = jest.fn();
        (bindings.input as jest.Mock).mockReturnValue([mockGetter, mockCleanup]);

        gpio = { chip: 0, line: 1 };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should initialize with default options', () => {
        const input = new Input(gpio);

        expect(bindings.input).toHaveBeenCalledWith(gpio.chip, gpio.line, 0);
        expect(input.value).toBe(false);
    });

    it('should initialize with provided options', () => {
        const options: GpioInputOptions = { bias: Bias.PullUp };
        const input = new Input(gpio, options);

        expect(bindings.input).toHaveBeenCalledWith(gpio.chip, gpio.line, options.bias);
        expect(input.value).toBe(false);
    });

    it('should call cleanup when stop is invoked', () => {
        const input = new Input(gpio);

        input.stop();

        expect(mockCleanup).toHaveBeenCalled();
    });

    it('should return the correct value from the getter', () => {
        mockGetter.mockReturnValue(true);
        const input = new Input(gpio);

        expect(input.value).toBe(true);
    });
});