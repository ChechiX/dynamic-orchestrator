import './pages/dashboard-page';

import { TaskDataManager } from './dm/task-data-manager';

import './styles/main.scss';

const dm = new TaskDataManager();

dm.attach();

dm.load();

window.addEventListener('analytics-event', (e) => {
  console.log('Analytics:', e.detail);
});
