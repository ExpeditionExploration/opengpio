import { Watch } from './Watch';
import { bindings } from '../bindings';
import { Edge, Gpio } from '../types';

jest.mock('../bindings', () => ({
    bindings: {
        watch: jest.fn(),
    },
}));

describe('Watch', () => {
    let mockGetter: jest.Mock;
    let mockCleanup: jest.Mock;
    let mockCallback: jest.Mock;

    beforeEach(() => {
        mockGetter = jest.fn().mockReturnValue(false);
        mockCleanup = jest.fn();
        mockCallback = jest.fn();

        (bindings.watch as jest.Mock).mockImplementation((chip, line, debounce, bias, callback) => {
            mockCallback = callback;
            return [mockGetter, mockCleanup];
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should initialize and set up bindings.watch', () => {
        const gpio: Gpio = { chip: 0, line: 1 };
        const edge = Edge.Both;

        const watch = new Watch(gpio, edge);

        expect(bindings.watch).toHaveBeenCalledWith(
            gpio.chip,
            gpio.line,
            0, // default debounce
            0, // default bias
            expect.any(Function)
        );
        expect(watch.value).toBe(false);
    });

    it('should emit "rise" and "change" when value rises', () => {
        const gpio: Gpio = { chip: 0, line: 1 };
        const edge = Edge.Rising;

        const watch = new Watch(gpio, edge);
        const changeSpy = jest.fn();
        const riseSpy = jest.fn();

        watch.on('change', changeSpy);
        watch.on('rise', riseSpy);

        mockCallback(true);

        expect(changeSpy).toHaveBeenCalledWith(true);
        expect(riseSpy).toHaveBeenCalledWith(true);
    });

    it('should emit "fall" and "change" when value falls', () => {
        const gpio: Gpio = { chip: 0, line: 1 };
        const edge = Edge.Falling;

        const watch = new Watch(gpio, edge);
        const changeSpy = jest.fn();
        const fallSpy = jest.fn();

        watch.on('change', changeSpy);
        watch.on('fall', fallSpy);

        mockCallback(false);

        expect(changeSpy).toHaveBeenCalledWith(false);
        expect(fallSpy).toHaveBeenCalledWith(false);
    });

    it('should emit "change" for both rising and falling edges', () => {
        const gpio: Gpio = { chip: 0, line: 1 };
        const edge = Edge.Both;

        const watch = new Watch(gpio, edge);
        const changeSpy = jest.fn();

        watch.on('change', changeSpy);

        mockCallback(true);
        mockCallback(false);

        expect(changeSpy).toHaveBeenCalledTimes(2);
        expect(changeSpy).toHaveBeenCalledWith(true);
        expect(changeSpy).toHaveBeenCalledWith(false);
    });

    it('should stop and clean up properly', () => {
        const gpio: Gpio = { chip: 0, line: 1 };
        const edge = Edge.Both;

        const watch = new Watch(gpio, edge);

        watch.stop();

        expect(mockCleanup).toHaveBeenCalled();
        expect(watch.listenerCount('event')).toBe(0);
    });
});