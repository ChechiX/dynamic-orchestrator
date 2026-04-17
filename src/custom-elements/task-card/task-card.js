import { LitElement, html, css, unsafeCSS } from 'lit';

import styles from './task-card.scss?inline';

export class TaskCard extends LitElement {
  static properties = {
    task: { type: Object },
  };

  static styles = css`
    ${unsafeCSS(styles)}
  `;

  render() {
    if (!this.task) return html``;

    return html` <article class="card" data-priority=${this.task.priority}>
      <div class="meta">
        <span class="priority">${this.task.priority}</span>
        <span class="type">${this.task.type}</span>
      </div>
      <div class="content">
        <slot></slot>
      </div>
    </article>`;
  }
}

customElements.define('task-card', TaskCard);
