import { Device } from './Device';
import { Input } from './Input';
import { Output } from './Output';
import { Watch } from './Watch';
import { Pwm } from './Pwm';
import { Edge, Gpio, GpioInputOptions, GpioOutputOptions } from '../types';

jest.mock('./Input');
jest.mock('./Output');
jest.mock('./Watch');
jest.mock('./Pwm');

describe('Device', () => {
    const mockGpio: Gpio = { chip: 1, line: 2 };
    const mockEdge: Edge = Edge.Rising;
    const mockInputOptions: GpioInputOptions = { debounce: 10 };
    const mockOutputOptions: GpioOutputOptions = {};
    const mockDutyCycle = 50;
    const mockFrequency = 1000;

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe.only('input()', () => {
        it('should create an Input instance when input is called', () => {
            Device.input(mockGpio, {});
            expect(Input).toHaveBeenCalledWith(mockGpio, mockInputOptions);
        });
    });

    it('should create an Output instance when output is called', () => {
        Device.output(mockGpio, mockOutputOptions);
        expect(Output).toHaveBeenCalledWith(mockGpio, mockOutputOptions);
    });

    it('should create a Watch instance when watch is called', () => {
        Device.watch(mockGpio, mockEdge, mockInputOptions);
        expect(Watch).toHaveBeenCalledWith(mockGpio, mockEdge, mockInputOptions);
    });

    it('should create a Pwm instance when pwm is called', () => {
        Device.pwm(mockGpio, mockDutyCycle, mockFrequency, mockOutputOptions);
        expect(Pwm).toHaveBeenCalledWith(mockGpio, mockDutyCycle, mockFrequency, mockOutputOptions);
    });
});