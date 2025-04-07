"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const Device_1 = require("../classes/Device");
class Radxa_Rock_S0 extends Device_1.Device {
}
_a = Radxa_Rock_S0;
Radxa_Rock_S0.board = {
    3: { chip: 0, line: 11 },
    5: { chip: 0, line: 12 },
    27: { chip: 0, line: 15 },
    28: { chip: 0, line: 16 },
    15: { chip: 0, line: 17 },
    33: { chip: 0, line: 18 },
    21: { chip: 1, line: 22 },
    19: { chip: 1, line: 23 },
    23: { chip: 1, line: 24 },
    24: { chip: 1, line: 25 },
    8: { chip: 2, line: 1 },
    37: { chip: 2, line: 2 },
    13: { chip: 2, line: 3 },
    35: { chip: 2, line: 4 },
    38: { chip: 2, line: 5 },
    36: { chip: 2, line: 6 },
    40: { chip: 2, line: 7 },
    26: { chip: 2, line: 8 },
    12: { chip: 2, line: 9 },
    31: { chip: 2, line: 10 },
    22: { chip: 2, line: 11 },
    32: { chip: 2, line: 12 },
    7: { chip: 2, line: 13 },
    11: { chip: 2, line: 14 },
    18: { chip: 2, line: 15 },
    29: { chip: 2, line: 16 },
};
Radxa_Rock_S0.bcm = {
    PIN_3: _a.board[3],
    PIN_5: _a.board[5],
    PIN_27: _a.board[27],
    PIN_28: _a.board[28],
    PIN_15: _a.board[15],
    PIN_33: _a.board[33],
    PIN_21: _a.board[21],
    PIN_19: _a.board[19],
    PIN_23: _a.board[23],
    PIN_24: _a.board[24],
    PIN_8: _a.board[8],
    PIN_37: _a.board[37],
    PIN_13: _a.board[13],
    PIN_35: _a.board[35],
    PIN_38: _a.board[38],
    PIN_36: _a.board[36],
    PIN_40: _a.board[40],
    PIN_26: _a.board[26],
    PIN_12: _a.board[12],
    PIN_31: _a.board[31],
    PIN_22: _a.board[22],
    PIN_32: _a.board[32],
    PIN_7: _a.board[7],
    PIN_11: _a.board[11],
    PIN_18: _a.board[18],
    PIN_29: _a.board[29],
};
exports.default = Radxa_Rock_S0;
