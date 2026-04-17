import { LitElement, html, css, unsafeCSS } from 'lit';

import '../custom-elements/task-list/task-list';

import styles from './dashboard-page.scss?inline';

export class DashboardPage extends LitElement {
  static styles = css`
    ${unsafeCSS(styles)}
  `;

  static properties = {
    tasks: { state: true },
  };

  constructor() {
    super();
    this.tasks = [];
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('tasks-updated', this._onTaskUpdated);
  }

  render() {
    return html`<main>
      <h1>Smart Task Dashboard</h1>
      <task-list .tasks=${this.tasks}></task-list>
    </main>`;
  }

  _onTaskUpdated = (e) => {
    this.tasks = e.detail.tasks;
  };
}

customElements.define('dashboard-page', DashboardPage);
