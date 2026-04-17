import { LitElement, html, css } from 'lit';

export class ErrorBoundary extends LitElement {
  static properties = {
    error: { state: true },
    message: { type: String },
  };

  constructor() {
    super();
    this.error = null;
    this.message = 'Error al renderizar la tarjeta.';
  }

  errorCallback(error) {
    this.error = error;
  }

  render() {
    if (this.error) {
      return html`<div class="error">${this.message}</div>`;
    }

    return html`<slot></slot>`;
  }
}

customElements.define('error-boundary', ErrorBoundary);
