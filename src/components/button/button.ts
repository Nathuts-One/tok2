/**
 * ds-button — Design System Button Web Component
 *
 * Attributes:
 *   variant  — "primary" | "secondary" | "outline" | "ghost"  (default: "primary")
 *   size     — "sm" | "md" | "lg"                             (default: "md")
 *   disabled — boolean
 *   label    — string
 */
class DsButton extends HTMLElement {
  static get observedAttributes() {
    return ['variant', 'size', 'disabled', 'label'];
  }

  connectedCallback() {
    this.render();
    this.addEventListener('click', this.handleClick);
  }

  disconnectedCallback() {
    this.removeEventListener('click', this.handleClick);
  }

  attributeChangedCallback() {
    this.render();
  }

  handleClick(e: Event) {
    if (this.hasAttribute('disabled')) {
      e.stopImmediatePropagation();
      e.preventDefault();
    }
  }

  render() {
    const variant  = this.getAttribute('variant')  ?? 'primary';
    const size     = this.getAttribute('size')     ?? 'md';
    const disabled = this.hasAttribute('disabled');
    const label    = this.getAttribute('label')    ?? this.textContent ?? '';

    this.innerHTML = `
      <button
        class="ds-button ds-button--${variant} ds-button--${size}"
        ${disabled ? 'disabled aria-disabled="true"' : ''}
      >${label}</button>
    `;
  }
}

customElements.define('ds-button', DsButton);
export { DsButton };
