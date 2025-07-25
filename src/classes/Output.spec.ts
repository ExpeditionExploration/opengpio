import { Output } from './Output';
import { bindings } from '../bindings';
import { Gpio } from '../types';
import { DriverStoppedError } from '../errors/DriverStoppedError';

jest.mock('../bindings', () => ({
    bindings: {
        output: jest.fn()
    }
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

    it('should throw DriverStoppedError if value is set after stop is invoked', () => {
        const output = new Output(gpio);

        output.stop();

        expect(() => {
            output.value = true;
        }).toThrow(DriverStoppedError);
    });

    it('should return the last value set when value getter is called', () => {
        const output = new Output(gpio);

        output.value = true;
        expect(output.value).toBe(true);

        output.value = false;
        expect(output.value).toBe(false);
    });

    it('should return null when no value has been set', () => {
        const output = new Output(gpio);

        expect(output.value).toBe(null);
    });

    it('should throw DriverStoppedError when getting value after stop is invoked', () => {
        const output = new Output(gpio);

        output.stop();

        expect(() => {
            const value = output.value;
        }).toThrow(DriverStoppedError);
    });

    it('should convert truthy values to boolean when setting value', () => {
        const output = new Output(gpio);

        output.value = 1 as any;
        expect(output.value).toBe(true);
        expect(mockSetter).toHaveBeenCalledWith(true);

        output.value = 'test' as any;
        expect(output.value).toBe(true);
        expect(mockSetter).toHaveBeenCalledWith(true);

        output.value = 0 as any;
        expect(output.value).toBe(false);
        expect(mockSetter).toHaveBeenCalledWith(false);
    });
});
