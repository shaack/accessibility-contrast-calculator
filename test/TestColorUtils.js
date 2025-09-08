/**
 * Author and copyright: Stefan Haack (https://shaack.com)
 * License: MIT, see file 'LICENSE'
 */
import {describe, it, assert} from "teevi/src/teevi.js"
import {ColorUtils} from "../src/ColorUtils.js";

describe("TestColorUtils", function () {
    it("should calculate the correct contrast ratio", function () {
        const fg = "#010000";
        const bg = "#ca8b8a";
        assert.equal(ColorUtils.contrastRatio(fg, bg), 7.56);
    })
})