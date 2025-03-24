import { Output } from './Output';
import { bindings } from '../bindings';
import { Gpio } from '../types';

jest.mock('../bindings', () => ({
    bindings: {
        output: jest.fn(),
    },
}));

describe('Output', () => {
    let mockSetter: jest.Mock;
    let mockCleanup: jest.Mock;
    let gpio: Gpio;

    beforeEach(() => {
        mockSetter = jest.fn();
        mockCleanup = jest.fn();
        (bindings.output as jest.Mock).mockReturnValue([mockSetter, mockCleanup]);

        gpio = { chip: 0, line: 1 }; // Example GPIO object
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should initialize with bindings.output and set setter and cleanup', () => {
        const output = new Output(gpio);

        expect(bindings.output).toHaveBeenCalledWith(gpio.chip, gpio.line);
        expect((output as any).setter).toBe(mockSetter);
    });

    it('should call cleanup when stop is invoked', () => {
        const output = new Output(gpio);

        output.stop();

        expect(mockCleanup).toHaveBeenCalled();
    });

    it('should call setter with the correct value when value is set', () => {
        const output = new Output(gpio);

        output.value = true;

        expect(mockSetter).toHaveBeenCalledWith(true);

        output.value = false;

        expect(mockSetter).toHaveBeenCalledWith(false);
    });
});