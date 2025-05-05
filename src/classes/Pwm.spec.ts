import { Pwm } from './Pwm';
import { bindings } from '../bindings';
import { Gpio } from '../types';
import { DriverStoppedError } from '../errors/DriverStoppedError';

jest.mock('../bindings', () => ({
    bindings: {
        pwm: jest.fn(),
    },
}));

describe('Pwm', () => {
    let mockSetDutyCycle: jest.Mock;
    let mockSetFrequency: jest.Mock;
    let mockCleanup: jest.Mock;
    let gpio: Gpio;

    beforeEach(() => {
        mockSetDutyCycle = jest.fn();
        mockSetFrequency = jest.fn();
        mockCleanup = jest.fn();

        (bindings.pwm as jest.Mock).mockReturnValue([
            mockSetDutyCycle,
            mockSetFrequency,
            mockCleanup,
        ]);

        gpio = { chip: 0, line: 1 };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should initialize with the correct parameters', () => {
        const pwm = new Pwm(gpio, 50, 100);

        expect(bindings.pwm).toHaveBeenCalledWith(0, 1, 50, 100);
    });

    it('should set duty cycle when not stopped', () => {
        const pwm = new Pwm(gpio, 50, 100);

        pwm.setDutyCycle(75);

        expect(mockSetDutyCycle).toHaveBeenCalledWith(75);
    });

    it('should throw an error when setting duty cycle after stop', () => {
        const pwm = new Pwm(gpio, 50, 100);

        pwm.stop();

        expect(() => pwm.setDutyCycle(75)).toThrow(DriverStoppedError);
    });

    it('should set frequency when not stopped', () => {
        const pwm = new Pwm(gpio, 50, 100);

        pwm.setFrequency(200);

        expect(mockSetFrequency).toHaveBeenCalledWith(200);
    });

    it('should throw an error when setting frequency after stop', () => {
        const pwm = new Pwm(gpio, 50, 100);

        pwm.stop();

        expect(() => pwm.setFrequency(200)).toThrow(DriverStoppedError);
    });

    it('should call cleanup when stopped', () => {
        const pwm = new Pwm(gpio, 50, 100);

        pwm.stop();

        expect(mockCleanup).toHaveBeenCalled();
    });
});