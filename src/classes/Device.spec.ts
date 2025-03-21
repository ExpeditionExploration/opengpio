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
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('getGpioFromIdentifier()', () => {
        const mockGpio: Gpio = { chip: 1, line: 2 };
        const mockBoard: Record<number, Gpio> = { 1: mockGpio };
        const mockBcm: Record<string, Gpio> = { 'GPIO1': mockGpio };

        Device.board = mockBoard;
        Device.bcm = mockBcm;

        it('should return the correct GPIO object when given a GPIO object', () => {
            expect(Device['getGpioFromIdentifier'](mockGpio)).toBe(mockGpio);
        });

        it('should return the correct GPIO object when given a board key', () => {
            expect(Device['getGpioFromIdentifier'](1)).toBe(mockGpio);
        });

        it('should return the correct GPIO object when given a bcm key', () => {
            expect(Device['getGpioFromIdentifier']('GPIO1')).toBe(mockGpio);
        });

        it('should throw an error for invalid identifier types', () => {
            expect(() => Device['getGpioFromIdentifier'](true as any)).toThrow('Invalid identifier type');
        });
    })

    describe('input()', () => {
        const mockInputOptions: GpioInputOptions = { debounce: 10 };
        const mockGpio: Gpio = { chip: 1, line: 2 };

        it('should create an Input instance when input is called', () => {
            Device.input(mockGpio, mockInputOptions);
            expect(Input).toHaveBeenCalledWith(mockGpio, mockInputOptions);
        });
    });

    describe('output()', () => {
        const mockGpio: Gpio = { chip: 1, line: 2 };
        const mockOutputOptions: GpioOutputOptions = {};

        it('should create an Output instance when output is called', () => {
            Device.output(mockGpio, mockOutputOptions);
            expect(Output).toHaveBeenCalledWith(mockGpio, mockOutputOptions);
        });
    })

    describe('watch()', () => {
        const mockGpio: Gpio = { chip: 1, line: 2 };
        const mockEdge: Edge = Edge.Rising;
        const mockInputOptions: GpioInputOptions = { debounce: 10 };

        it('should create a Watch instance when watch is called', () => {
            Device.watch(mockGpio, mockEdge, mockInputOptions);
            expect(Watch).toHaveBeenCalledWith(mockGpio, mockEdge, mockInputOptions);
        });
    });

    describe('pwm()', () => {
        const mockGpio: Gpio = { chip: 1, line: 2 };
        const mockDutyCycle = 50;
        const mockFrequency = 1000;
        const mockOutputOptions: GpioOutputOptions = {};

        it('should create a Pwm instance when pwm is called', () => {
            Device.pwm(mockGpio, mockDutyCycle, mockFrequency, mockOutputOptions);
            expect(Pwm).toHaveBeenCalledWith(mockGpio, mockDutyCycle, mockFrequency, mockOutputOptions);
        });
    });
});