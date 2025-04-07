"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bias = exports.Edge = void 0;
/**
 * Represents the edge type for GPIO events.
 * - `Rising`: Triggered on a rising edge (low to high).
 * - `Falling`: Triggered on a falling edge (high to low).
 * - `Both`: Triggered on both rising and falling edges.
 */
var Edge;
(function (Edge) {
    Edge[Edge["Rising"] = 1] = "Rising";
    Edge[Edge["Falling"] = -1] = "Falling";
    Edge[Edge["Both"] = 0] = "Both";
})(Edge || (exports.Edge = Edge = {}));
/**
 * Represents the bias configuration for a GPIO pin.
 * - `Disabled`: No bias is applied.
 * - `PullUp`: Pull-up resistor is enabled.
 * - `PullDown`: Pull-down resistor is enabled.
 */
var Bias;
(function (Bias) {
    // AsIs = 1,
    // Unknown = 2,
    Bias[Bias["Disabled"] = 3] = "Disabled";
    Bias[Bias["PullUp"] = 4] = "PullUp";
    Bias[Bias["PullDown"] = 5] = "PullDown";
})(Bias || (exports.Bias = Bias = {}));
