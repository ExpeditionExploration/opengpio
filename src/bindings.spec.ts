import binding from 'bindings';
jest.mock('bindings');

describe('bindings', () => {
    beforeEach(() => {
        process.env.OPENGPIO_MOCKED = undefined;
    });

    it('should load real bindings when OPENGPIO_MOCKED is not set to "true"', () => {
        jest.isolateModulesAsync(async () => {
            const { bindings, mocked } = await import('./bindings');
            expect(binding).toHaveBeenCalledWith('opengpio');
            expect(bindings).not.toEqual({});
            expect(mocked).toBe(false);
        });
    });

    it('should use mocked bindings when OPENGPIO_MOCKED is set to "true"', () => {
        process.env.OPENGPIO_MOCKED = 'true';
        jest.isolateModulesAsync(async () => {
            const { bindings, mocked } = await import('./bindings');
            expect(mocked).toBe(true);
            expect(bindings.info).toBeInstanceOf(Function);
            expect(bindings.input).toBeInstanceOf(Function);
            expect(bindings.output).toBeInstanceOf(Function);
            expect(bindings.pwm).toBeInstanceOf(Function);
            expect(bindings.watch).toBeInstanceOf(Function);
        });
    });
});
