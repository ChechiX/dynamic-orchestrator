import { LitElement, html, css } from 'lit';

import '../custom-elements/task-list/task-list';

export class DashboardPage extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
      }
    `,
  ];

  render() {
    return html`<main>
      <h1>Smart Task Dashboard</h1>
      <task-list></task-list>
    </main>`;
  }
}

customElements.define('dashboard-page', DashboardPage);
