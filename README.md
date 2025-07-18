# OpenGPIO

A performant c++ based general purpose GPIO controller for linux devices.
OpenGPIO is written using libgpiod, line & chip based abstractions.

While this library can be used on most devices, you'll need to know the chip and line numbers corrisponding to the GPIO pin you want to access. This information can usually be found in the datasheet for your devices SOC. If all that sounds way to complicated, you can make use of one of the official device drivers which already have the bcm and board pin mappings for GPIO pins.

## Prerequisites

-   **libgpiod 2.x**
    It uses [GPIO Character Device Userspace API v2](https://docs.kernel.org/userspace-api/gpio/chardev.html) that requires Linux kernel 5.10 or newer.

    To install libgpiod 2.x you will need the Debian repository mirror in your sources.
    You can run the script below to add it.

    ```sh
    # Add Debian repository sid (unstable) mirror to APT sources
    echo "deb https://deb.debian.org/debian sid main" | sudo tee /etc/apt/sources.list.d/debian-sid.list

    # Install Debian repository keyring
    sudo apt install debian-archive-keyring

    # Add it to APT keystore
    sudo ln -s /usr/share/keyrings/debian-archive-keyring.gpg /etc/apt/trusted.gpg.d/

    # Fetch package list from Debian repository mirror
    sudo apt update

    # Install https://packages.debian.org/sid/libgpiod-dev
    sudo apt install libgpiod-dev/sid

    # (Optionally unlink Debian repository keyring for safety)
    sudo rm /etc/apt/trusted.gpg.d/debian-archive-keyring.gpg
    ```

    **Manual**
    Alternatively, manually build libgpiod 2.2.1 from source.
    First, uninstall libgpiod 1.x by `sudo apt remove libgpiod-dev gpiod libgpiod2`. Then, [build from source](https://libgpiod.readthedocs.io/en/latest/building.html#building). Finally, run `./autogen.sh --enable-bindings-cxx` for Node-API bindings.

    **Debugging**
    If after installing libgpiod you encounter issues loading libgpiod with errors like: `Error: libgpiodcxx.so.2: cannot open shared object file: No such file or directory`, you may need to update the system library cache. You can do this by running: `sudo ldconfig`

## Supported Features

-   GPIO - General purpose input output.
-   PWM (via GPIO) - GPIO based pulse width modulation.
-   Events - Event callbacks for rising, falling, or both edges.

## Unsupported Features

-   Native PWM - This library does not yet support native PWM, only emulated PWM via GPIO.
-   I2C - Use the openi2c library for common i2c module drivers (still highly WIP), or alternatively we recommending using the i2c-bus library directly.

## Official Device Drivers

-   RaspberryPi 2B
-   RaspberryPi 3B
-   RaspberryPi 3B+
-   RaspberryPi 400
-   RaspberryPi 4B
-   RaspberryPi 5B
-   RaspberryPi Zero2W
-   RaspberryPi ZeroW
-   OrangePi 5
-   OrangePi CM5
-   NanoPI NEO3
-   Radax Rock S0

## Using An Official Driver

Using an official device driver is simple, just import the device by its name.
Pins can be referenced directly by bcm identifier, board pin number, or via static named mappings on the device class as seen in the examples below.

```ts
import { RaspberryPi_5B, Edge } from 'opengpio';

// GPIO Output
const output = RaspberryPi_5B.output('GPIO14');
output.value = true; // Set the RaspberryPi 5B's GPIO14 pin high
output.value = false; // Set the RaspberryPi 5B's GPIO14 pin low

// GPIO Input
const input = RaspberryPi_5B.input(8);
console.log(input.value); // Gets the RaspberryPi 5B's pin 8 value as true (high) / false (low)

// GPIO Events
// Creates a listener for events on the RaspberryPi 5B's GPIO14 pin for both Rising and Falling edges.
// Available Events: "change", "rise", "fall"
const watcher = RaspberryPi_5B.watch(RaspberryPi_5B.bcm.GPIO14, Edge.Both);
watcher.on('change', (value) => {
    console.log(value); // Contains the high/low value as true/false
});

// Get the current value of the watcher
console.log(watcher.value);

// GPIO PWM
// Creates a 50HZ (20ms) PWM on the RaspberryPi 5B's pin 8, with a duty cycle of 10% (2ms)
const pwm = RaspberryPi_5B.pwm(RaspberryPi_5B.board[8], 0.1, 50);
pwm.setDutyCycle(0.2); // Updates the duty cycle of the pwm to 20% (4ms)
pwm.setFrequency(100); // Updates the frequency to 100HZ
```

## Using An Unofficial Driver

If no official driver exists, you can use the Default device and provide the chip and line numbers directly. Otherwise, usage is identical.

```ts
import { Default, Edge } from 'opengpio';

// GPIO Output
const output = Default.output({ chip: 0, line: 27 });
output.value = true; // Set the pin high at chip 0 line 27
```

## Local Development

There's a good chance you are developing your software on a separate operating system from where it will finally run. In this case opengpio may not be compatible with your system. For example, developing on Windows or Mac for later deployment to Raspberry Pi running Raspbian. In these cases, you can install the library locally using `npm i --save opengpio --ignore-scripts` to prevent npm from running build when it installs. Since bindings will not exist, you will need to tell opengpio not to load the bindings when it imports the library. You can do this by setting the environment variable `OPENGPIO_MOCKED=true`. This will prevent opengpio from loading the native bindings and instead all functions will be replaced with mock functions that don't call the native bindings.

If you have a case where you need to detect if the library is running with mocked bindings you can check a parameter called "mocked", exported from the library.

```ts
import opengpio from 'opengpio';
if (opengpio.mocked) {
    console.log('opengpio is running with mocked bindings');
}
```
