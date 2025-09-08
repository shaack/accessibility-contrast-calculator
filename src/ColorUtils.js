/**
 * Author and copyright: Stefan Haack (https://shaack.com)
 * License: MIT, see file 'LICENSE'
 */
export class ColorUtils {
    /**
     * Calculate relative luminance of a color
     * @param {string} hex - Hex color string e.g. "#ffffff"
     * @returns {number} - Luminance value (0-1)
     */
    static luminance(hex) {
        let rgb = hex.replace('#', '').match(/.{2}/g).map(x => parseInt(x, 16) / 255);
        rgb = rgb.map(v =>
            v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
        );
        return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
    }

    /**
     * Calculate contrast ratio between two hex colors
     * @param {string} hex1 - First color
     * @param {string} hex2 - Second color
     * @returns {number} - Contrast ratio (1-21)
     */
    static contrastRatio(hex1, hex2) {
        const lum1 = this.luminance(hex1);
        const lum2 = this.luminance(hex2);
        const lighter = Math.max(lum1, lum2);
        const darker = Math.min(lum1, lum2);
        return Number(((lighter + 0.05) / (darker + 0.05)).toFixed(2));
    }
}
