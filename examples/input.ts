import { RaspberryPi_5B, Bias } from '../src';
const input = RaspberryPi_5B.input('GPIO14', {
    bias: Bias.PullUp
});

setInterval(() => {
    console.log('Value', input.value);
}, 1000);

process.on('beforeExit', () => {
    // Best practice to stop the input before exiting
    // to avoid any potential issues with the GPIO pins.
    input.stop();
})