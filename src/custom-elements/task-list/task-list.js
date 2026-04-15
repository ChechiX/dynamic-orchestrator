import { LitElement, html, css } from 'lit';

export class TaskList extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
      }
    `,
  ];

  static properties = {
    tasks: { type: Array },
  };

  render() {
    return html`<ul>
      <li>Task 1</li>
      <li>Task 2</li>
      <li>Task 3</li>
    </ul>`;
  }
}

customElements.define('task-list', TaskList);
