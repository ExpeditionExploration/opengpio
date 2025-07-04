var _a;
import { Device } from '../classes/Device';
// Schematics: https://drive.google.com/drive/folders/1eG4tuJnv7Jd4BzQTmjXZhBjIs2sG2z4L
export class OrangePi_5 extends Device {
}
_a = OrangePi_5;
OrangePi_5.board = {
    3: { chip: 1, line: 27 }, //GPIO2 GPIO1_D3
    5: { chip: 1, line: 26 }, //GPIO3 GPIO1_D2
    7: { chip: 1, line: 25 }, //GPIO4 GPIO1_D1
    11: { chip: 1, line: 25 }, //GPIO17 GPIO1_D0
    12: { chip: 1, line: 29 }, //GPIO18 GPIO1_D5
    13: { chip: 1, line: 22 }, //GPIO27 GPIO1_C6
    15: { chip: 1, line: 20 }, //GPIO22 GPIO1_C4
    16: { chip: 0, line: 18 }, //GPIO23 GPIO0_C2
    18: { chip: 1, line: 15 }, //GPIO24 GPIO1_B7
    19: { chip: 1, line: 7 }, //GPIO10 GPIO1_A7
    21: { chip: 1, line: 6 }, //GPIO9 GPIO1_A6
    22: { chip: 1, line: 14 }, //GPIO25 GPIO1_B6
    23: { chip: 1, line: 5 }, //GPIO11 GPIO1_A5
    24: { chip: 1, line: 13 }, //GPIO8 GPIO1_B5
    26: { chip: 1, line: 12 }, //GPIO7 GPIO1_B4
    29: { chip: 1, line: 4 }, //GPIO5 GPIO1_A4
    31: { chip: 1, line: 3 }, //GPIO6 GPIO1_A3
    32: { chip: 1, line: 11 }, //GPIO12 GPIO1_B3
    33: { chip: 1, line: 2 }, //GPIO13 GPIO1_A2
    35: { chip: 1, line: 17 }, //GPIO19 GPIO1_C1
    36: { chip: 1, line: 10 }, //GPIO16 GPIO1_B2
    37: { chip: 1, line: 16 }, //GPIO26 GPIO1_C0
    38: { chip: 1, line: 9 }, //GPIO20 GPIO1_B1
    40: { chip: 1, line: 8 } //GPIO21 GPIO1_B0
};
OrangePi_5.bcm = {
    GPIO2: _a.board[3],
    GPIO1_D3: _a.board[3],
    GPIO3: _a.board[5],
    GPIO1_D2: _a.board[5],
    GPIO4: _a.board[7],
    GPIO1_D1: _a.board[7],
    GPIO5: _a.board[29],
    GPIO1_A4: _a.board[29],
    GPIO6: _a.board[31],
    GPIO1_A3: _a.board[31],
    GPIO7: _a.board[26],
    GPIO1_B4: _a.board[26],
    GPIO8: _a.board[24],
    GPIO1_B5: _a.board[24],
    GPIO9: _a.board[21],
    GPIO1_A6: _a.board[21],
    GPIO10: _a.board[19],
    GPIO1_A7: _a.board[19],
    GPIO11: _a.board[23],
    GPIO1_A5: _a.board[23],
    GPIO12: _a.board[32],
    GPIO1_B3: _a.board[32],
    GPIO13: _a.board[33],
    GPIO1_A2: _a.board[33],
    // GPIO14: this.board[8], // UART TX
    // GPIO15: this.board[10], // UART RX
    GPIO16: _a.board[36],
    GPIO1_B2: _a.board[36],
    GPIO17: _a.board[11],
    GPIO1_D0: _a.board[11],
    GPIO18: _a.board[12],
    GPIO1_D5: _a.board[12],
    GPIO19: _a.board[35],
    GPIO1_C1: _a.board[35],
    GPIO20: _a.board[38],
    GPIO1_B1: _a.board[38],
    GPIO21: _a.board[40],
    GPIO1_B0: _a.board[40],
    GPIO22: _a.board[15],
    GPIO1_C4: _a.board[15],
    GPIO23: _a.board[16],
    GPIO0_C2: _a.board[16],
    GPIO24: _a.board[18],
    GPIO1_B7: _a.board[18],
    GPIO25: _a.board[22],
    GPIO1_B6: _a.board[22],
    GPIO26: _a.board[37],
    GPIO1_C0: _a.board[37],
    GPIO27: _a.board[13],
    GPIO1_C6: _a.board[13]
};
//# sourceMappingURL=OrangePi_5.js.map