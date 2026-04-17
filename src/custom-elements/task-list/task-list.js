import { LitElement, html, css, unsafeCSS } from 'lit';

import { HasAnalytics } from '../shared/analytics-mixin';

import '../task-card/task-card';

import styles from './task-list.scss?inline';

export class TaskList extends HasAnalytics(LitElement) {
  static properties = {
    tasks: { type: Array },
  };

  static styles = css`${unsafeCSS(styles)}`;

  constructor() {
    super();
    this.tasks = [];
  }

  render() {
    return html`<ul>
      ${this.tasks.map((task) => this._renderTemplate(task))}
    </ul>`;
  }

  _emitToggleCheck(taskId, itemId) {
    this.logInteraction('toggle-check', { taskId, itemId });
    window.dispatchEvent(
      new CustomEvent('toggle-check', { detail: { taskId, itemId } }),
    );
  }

  _emitDelete(id) {
    this.logInteraction('delete-task', { id });
    window.dispatchEvent(new CustomEvent('delete-task', { detail: { id } }));
  }

  _emitUpdate(id, patch) {
    this.logInteraction('update-task', { id, patch });
    window.dispatchEvent(
      new CustomEvent('update-task', { detail: { id, patch } }),
    );
  }

  _renderTemplate(task) {
    switch (task.type) {
      case 'text':
        return html`
          <li>
            <task-card .task=${task}>
              <h3>${task.content.title}</h3>
              <p>${task.content.description}</p>
              <div class="actions">
                <button
                  class="danger"
                  @click=${() => this._emitDelete(task.id)}
                >
                  Eliminar
                </button>
                <button
                  @click=${() =>
                    this._emitUpdate(task.id, { priority: 'high' })}
                >
                  Prioridad alta
                </button>
              </div>
            </task-card>
          </li>
        `;
      case 'checklist':
        return html`
          <li>
            <task-card .task=${task}>
              <h3>${task.content.title}</h3>
              <div class="checklist">
                ${task.content.items.map(
                  (item) => html`
                    <div class="checklist-item">
                      <label>
                        <input
                          type="checkbox"
                          .checked=${item.completed}
                          @change=${() =>
                            this._emitToggleCheck(task.id, item.id)}
                        />
                        ${item.label}
                      </label>
                    </div>
                  `,
                )}
              </div>
              <div class="actions">
                <button
                  class="danger"
                  @click=${() => this._emitDelete(task.id)}
                >
                  Eliminar
                </button>
                <button
                  @click=${() =>
                    this._emitUpdate(task.id, { priority: 'high' })}
                >
                  Prioridad alta
                </button>
              </div>
            </task-card>
          </li>
        `;
      case 'alert':
        return html`
          <li>
            <task-card .task=${task}>
              <h3>${task.content.title}</h3>
              <p>${task.content.message}</p>
              <small>${task.content.errorCode}</small>
              <div class="actions">
                <button
                  class="danger"
                  @click=${() => this._emitDelete(task.id)}
                >
                  Eliminar
                </button>
                <button
                  @click=${() =>
                    this._emitUpdate(task.id, { priority: 'high' })}
                >
                  Prioridad alta
                </button>
              </div>
            </task-card>
          </li>
        `;
      default:
        return html`
          <li>
            <task-card .task=${task}>
              <p>Tipo desconocido: ${task.type}</p>
            </task-card>
          </li>
        `;
    }
  }
}

customElements.define('task-list', TaskList);
