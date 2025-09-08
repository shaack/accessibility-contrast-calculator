// Author: Junie (JetBrains AI)
// Light DOM Custom Element to keep Bootstrap styling
// Renders Bootstrap-marked markup into the element and wires behavior.

import {ColorUtils} from './ColorUtils.js'
import {I18n} from "cm-web-modules/src/i18n/I18n.js"

export class AccessibilityContrastCalculator extends HTMLElement {

    constructor() {
        super()
        this._initialized = false
        this.i18n = new I18n({locale: "de"})
        this.i18n.load({
            "de": {
                "name": "Farbkontrast Testtool",
                "backgroundLabel": "Hintergrund",
                "pickBgColor": "Hintergrundfarbe wählen",
                "swapColors": "Farben tauschen",
                "foregroundLabel": "Textfarbe",
                "pickFgColor": "Textfarbe wählen",
                "resultLabel": "Ergebnis:",
                "exampleLargeText": "Beispiel für großen Text",
                "exampleSmallText": "Beispiel für kleinen Text",
                "EXCELLENT": "HERVORRAGEND",
                "GOOD": "KÖNNTE BESSER SEIN",
                "POOR": "SCHLECHTER KONTRAST",
                "FAIL": "SCHLECHTER KONTRAST"
            },
            "en": {
                "name": "Color Contrast Testtool",
                "backgroundLabel": "Background",
                "pickBgColor": "Pick background color",
                "swapColors": "Swap colors",
                "foregroundLabel": "Text color",
                "pickFgColor": "Pick foreground color",
                "resultLabel": "Result:",
                "exampleLargeText": "Example for large text",
                "exampleSmallText": "Example for small text",
                "EXCELLENT": "EXCELLENT",
                "GOOD": "CAN BE BETTER",
                "POOR": "BAD CONTRAST",
                "FAIL": "BAD CONTRAST"
            },
        })
    }

    static get observedAttributes() {
        return ['bg', 'fg']
    }

    connectedCallback() {
        if (this._initialized) return
        this._initialized = true

        const initBg = this.getAttribute('bg') || '#ca8b8a'
        const initFg = this.getAttribute('fg') || '#010000'

        this.innerHTML = `
      <div class="card shadow-sm">
        <div class="card-body p-4">
          <h2 class="card-title text-center mb-4">${this.i18n.t("name")}</h2>

          <div class="row align-items-center mb-4">
            <div class="col-md-5">
              <div class="text-center">
                <h6 class="text-muted mb-3">${this.i18n.t("backgroundLabel")}</h6>
                <div class="d-flex align-items-center justify-content-center gap-3">
                  <div class="border border-3 rounded-3 preview-bg" title="${this.i18n.t('pickBgColor')}" style="width:80px; height:80px; cursor:pointer;"></div>
                  <input type="color" class="visually-hidden input-bg" value="${initBg}">
                  <input type="text" class="form-control font-monospace fw-bold text-center input-bg-hex" value="${initBg}" style="width: 100px;">
                </div>
              </div>
            </div>
            <div class="col-md-2 text-center">
              <button class="btn btn-light btn-swap mt-3 mb-2" title="${this.i18n.t('swapColors')}" aria-label="${this.i18n.t('swapColors')}"><i class="bi bi-arrow-left-right"></i></button>
            </div>
            <div class="col-md-5">
              <div class="text-center">
                <h6 class="text-muted mb-3">${this.i18n.t("foregroundLabel")}</h6>
                <div class="d-flex align-items-center justify-content-center gap-3">
                  <div class="border border-3 rounded-3 preview-fg" title="${this.i18n.t('pickFgColor')}" style="width:80px; height:80px; cursor:pointer;"></div>
                  <input type="color" class="visually-hidden input-fg" value="${initFg}">
                  <input type="text" class="form-control font-monospace fw-bold text-center input-fg-hex" value="${initFg}" style="width: 100px;">
                </div>
              </div>
            </div>
          </div>

          <div class="alert alert-secondary alert-light border-3 rounded-3 mb-4" role="status" aria-live="polite">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <h5 class="mb-0">${this.i18n.t("resultLabel")}</h5>
              <h5 class="mb-0 text-success contrast-ratio">–</h5>
            </div>

            <div class="row g-3">
              <div class="col-12">
                <div class="d-flex rounded-2 border">
                  <div class="p-3 flex-grow-1 example-large rounded-start">
                    <div class="fs-1 fw-bold text-large">${this.i18n.t("exampleLargeText")}</div>
                  </div>
                  <div class="p-3 bg-white d-flex gap-3 align-items-center rounded-end">
                    <div class="d-flex align-items-center gap-2">
                      <span class="bg-success text-light rounded-5 px-1 badge-large-aa"><i class="bi bi-check"></i></span>
                      <span class="fw-bold">AA</span>
                    </div>
                    <div class="d-flex align-items-center gap-2">
                      <span class="bg-success text-light rounded-5 px-1 badge-large-aaa"><i class="bi bi-check"></i></span>
                      <span class="fw-bold">AAA</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-12">
                <div class="d-flex rounded-2 border">
                  <div class="p-3 flex-grow-1 example-small rounded-start">
                    <div class="fs-6 fw-bold text-small">${this.i18n.t("exampleSmallText")}</div>
                  </div>
                  <div class="p-3 bg-white d-flex gap-3 align-items-center rounded-end">
                    <div class="d-flex align-items-center gap-2">
                      <span class="bg-success text-light rounded-5 px-1 badge-small-aa"><i class="bi bi-check"></i></span>
                      <span class="fw-bold">AA</span>
                    </div>
                    <div class="d-flex align-items-center gap-2">
                      <span class="bg-success text-light rounded-5 px-1 badge-small-aaa"><i class="bi bi-check"></i></span>
                      <span class="fw-bold">AAA</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>`

        const $ = (s) => this.querySelector(s)
        this.$bgPicker = $('.input-bg')
        this.$fgPicker = $('.input-fg')
        this.$bgHex = $('.input-bg-hex')
        this.$fgHex = $('.input-fg-hex')
        this.$bgPreview = $('.preview-bg')
        this.$fgPreview = $('.preview-fg')
        this.$ratio = $('.contrast-ratio')
        this.$exLarge = $('.example-large')
        this.$exSmall = $('.example-small')
        this.$txtLarge = $('.text-large')
        this.$txtSmall = $('.text-small')
        this.$badgeLargeAA = $('.badge-large-aa')
        this.$badgeLargeAAA = $('.badge-large-aaa')
        this.$badgeSmallAA = $('.badge-small-aa')
        this.$badgeSmallAAA = $('.badge-small-aaa')

        // Event wiring
        this.$bgPreview.addEventListener('click', () => this.$bgPicker.click())
        this.$fgPreview.addEventListener('click', () => this.$fgPicker.click())
        this.$bgPicker.addEventListener('input', () => {
            this.$bgHex.value = this.$bgPicker.value
            this.#update()
        })
        this.$fgPicker.addEventListener('input', () => {
            this.$fgHex.value = this.$fgPicker.value
            this.#update()
        })

        const onEnterBlur = (e) => {
            if (e.key === 'Enter') e.target.blur()
        }
        this.$bgHex.addEventListener('keydown', onEnterBlur)
        this.$fgHex.addEventListener('keydown', onEnterBlur)

        this.$bgHex.addEventListener('blur', () => this.#validateHex(this.$bgHex, this.$bgPicker))
        this.$fgHex.addEventListener('blur', () => this.#validateHex(this.$fgHex, this.$fgPicker))

        $('.btn-swap').addEventListener('click', () => this.swap())

        // Initial paint
        this.#update()
    }

    attributeChangedCallback(name, oldVal, newVal) {
        if (!this._initialized || oldVal === newVal) return
        if (name === 'bg') {
            const v = this.#normalizeHex(newVal)
            this.$bgPicker.value = v
            this.$bgHex.value = v
            this.#update()
        } else if (name === 'fg') {
            const v = this.#normalizeHex(newVal)
            this.$fgPicker.value = v
            this.$fgHex.value = v
            this.#update()
        }
    }

    // Public API
    get backgroundColor() {
        return this.$bgPicker?.value || this.getAttribute('bg') || '#ca8b8a'
    }

    set backgroundColor(v) {
        this.setAttribute('bg', this.#normalizeHex(v))
    }

    get foregroundColor() {
        return this.$fgPicker?.value || this.getAttribute('fg') || '#010000'
    }

    set foregroundColor(v) {
        this.setAttribute('fg', this.#normalizeHex(v))
    }

    swap() {
        const bg = this.$bgPicker.value, fg = this.$fgPicker.value
        this.$bgPicker.value = fg
        this.$fgPicker.value = bg
        this.$bgHex.value = fg
        this.$fgHex.value = bg
        this.#update()
    }

    #normalizeHex(h) {
        h = (h || '').trim()
        if (!h.startsWith('#')) h = '#' + h
        if (/^#([A-Fa-f0-9]{3})$/.test(h)) h = `#${h[1]}${h[1]}${h[2]}${h[2]}${h[3]}${h[3]}`
        return /^#([A-Fa-f0-9]{6})$/.test(h) ? h.toLowerCase() : '#000000'
    }

    #validateHex(input, picker) {
        const v = this.#normalizeHex(input.value)
        if (/^#([a-f0-9]{6})$/.test(v)) {
            input.classList.remove('is-invalid')
            picker.value = v
            this.#update()
        } else {
            input.classList.add('is-invalid')
        }
    }

    #setBadge(el, ok) {
        el.innerHTML = ok ? '<i class="bi bi-check"></i>' : '<i class="bi bi-x"></i>'
        el.classList.remove('bg-success', 'bg-danger')
        el.classList.add(ok ? 'bg-success' : 'bg-danger', 'rounded-circle', 'badge')
    }

    #update() {
        const bg = this.$bgPicker.value, fg = this.$fgPicker.value

        // Sync previews
        this.$bgPreview.style.backgroundColor = bg
        this.$fgPreview.style.backgroundColor = fg

        // Example boxes and text
        this.$exLarge.style.backgroundColor = bg
        this.$exSmall.style.backgroundColor = bg
        this.$txtLarge.style.color = fg
        this.$txtSmall.style.color = fg

        // Calculate contrast
        const ratio = ColorUtils.calculateContrastRatio(bg, fg)
        const status = ColorUtils.getContrastStatus(ratio)
        this.$ratio.textContent = `${ratio.toLocaleString(this.i18n.props.locale, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        })}:1 - ${this.i18n.t(status)}`

        this.$ratio.classList.remove('text-success', 'text-danger', 'text-warning')
        if (status === 'EXCELLENT') this.$ratio.classList.add('text-success')
        else if (status === 'GOOD') this.$ratio.classList.add('text-secondary')
        else this.$ratio.classList.add('text-danger')

        // WCAG badges
        this.#setBadge(this.$badgeLargeAA, ColorUtils.isWcagCompliant('AA', true, ratio))
        this.#setBadge(this.$badgeLargeAAA, ColorUtils.isWcagCompliant('AAA', true, ratio))
        this.#setBadge(this.$badgeSmallAA, ColorUtils.isWcagCompliant('AA', false, ratio))
        this.#setBadge(this.$badgeSmallAAA, ColorUtils.isWcagCompliant('AAA', false, ratio))

        // Fire change event so hosts can listen
        this.dispatchEvent(new CustomEvent('change', {
            detail: {bg, fg, ratio, status},
            bubbles: true
        }))
    }
}

customElements.define('accessibility-contrast-calculator', AccessibilityContrastCalculator)
