import { GpioDriver } from "./GpioDriver";
import EventEmitter from "events";

describe("GpioDriver", () => {
    let cleanupMock: jest.Mock;
    let driver: GpioDriver;

    beforeEach(() => {
        cleanupMock = jest.fn();
        driver = new GpioDriver(cleanupMock);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should register a new driver and emit debug logs", () => {
        expect(driver).toBeInstanceOf(EventEmitter);
        expect(cleanupMock).not.toHaveBeenCalled();
    });

    it("should return the correct stopped value", () => {
        expect(driver.stopped).toBe(false);
        driver.stop();
        expect(driver.stopped).toBe(true);
    });

    it("should call the cleanup callback when stopped", () => {
        driver.stop();
        expect(cleanupMock).toHaveBeenCalledTimes(1);
    });

    it("should not call cleanup callback if already stopped", () => {
        driver.stop();
        driver.stop();
        expect(cleanupMock).toHaveBeenCalledTimes(1);
    });

    it("should clean up all drivers on process beforeExit", () => {
        const secondDriver = new GpioDriver(jest.fn());
        const stopSpy1 = jest.spyOn(driver, "stop");
        const stopSpy2 = jest.spyOn(secondDriver, "stop");

        process.emit("beforeExit", 0);

        expect(stopSpy1).toHaveBeenCalledTimes(1);
        expect(stopSpy2).toHaveBeenCalledTimes(1);
    });
});