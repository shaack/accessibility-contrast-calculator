/**
 * Author and copyright: Stefan Haack (https://shaack.com)
 * License: MIT, see file 'LICENSE'
 */
export class ColorUtils {
    /**
     * Color utility functions for contrast ratio calculations
     */

    /**
     * Convert hex color to RGB object
     * @param {string} hex - Hex color string (e.g., "#ff0000")
     * @returns {object} RGB object with r, g, b properties
     */
    static hexToRgb(hex) {
        const r = parseInt(hex.slice(1, 3), 16)
        const g = parseInt(hex.slice(3, 5), 16)
        const b = parseInt(hex.slice(5, 7), 16)
        return {r, g, b}
    }

    /**
     * Calculate relative luminance of an RGB color
     * @param {object} rgb - RGB object with r, g, b properties
     * @returns {number} Relative luminance value
     */
    static relativeLuminance(rgb) {
        const rsRGB = rgb.r / 255
        const gsRGB = rgb.g / 255
        const bsRGB = rgb.b / 255

        const r = rsRGB <= 0.03928 ? rsRGB / 12.92 : Math.pow((rsRGB + 0.055) / 1.055, 2.4)
        const g = gsRGB <= 0.03928 ? gsRGB / 12.92 : Math.pow((gsRGB + 0.055) / 1.055, 2.4)
        const b = bsRGB <= 0.03928 ? bsRGB / 12.92 : Math.pow((bsRGB + 0.055) / 1.055, 2.4)

        return 0.2126 * r + 0.7152 * g + 0.0722 * b
    }

    /**
     * Calculate contrast ratio between two colors
     * @param {string} bgColor - Background color in hex format
     * @param {string} fgColor - Foreground color in hex format
     * @returns {number} Contrast ratio
     */
    static calculateContrastRatio(bgColor, fgColor) {
        // Convert hex to RGB
        const bgRgb = this.hexToRgb(bgColor)
        const fgRgb = this.hexToRgb(fgColor)

        // Calculate relative luminance
        const bgLum = this.relativeLuminance(bgRgb)
        const fgLum = this.relativeLuminance(fgRgb)

        // Calculate contrast ratio
        const lighter = Math.max(bgLum, fgLum)
        const darker = Math.min(bgLum, fgLum)

        return (lighter + 0.05) / (darker + 0.05)
    }

    /**
     * Get accessibility status based on contrast ratio
     * @param {number} ratio - Contrast ratio
     * @returns {string} Status description
     */
    static getContrastStatus(ratio) {
        if (ratio >= 7) return 'EXCELLENT!'
        else if (ratio >= 4.5) return 'GOOD'
        else if (ratio >= 3) return 'POOR'
        else return 'FAIL'
    }

    /**
     * Check if the contrast ratio meets WCAG compliance standards
     * @param {string} level - WCAG level ("AA" or "AAA")
     * @param {boolean} isLargeText - Text size in pixels (24px+ is considered large text)
     * @param {number} contrastRatio - Contrast ratio value
     * @returns {boolean} True if compliant, false if not
     */
    static isWcagCompliant(level, isLargeText, contrastRatio) {
        if (level === "AA") {
            // AA: Large text 3:1, Small text 4.5:1
            return isLargeText ? contrastRatio >= 3 : contrastRatio >= 4.5
        } else if (level === "AAA") {
            // AAA: Large text 4.5:1, Small text 7:1
            return isLargeText ? contrastRatio >= 4.5 : contrastRatio >= 7
        }
        return false
    }


}
