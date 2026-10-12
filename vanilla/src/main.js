import { renderListView } from './views/list.js';

function route() {
  renderListView();
}

window.addEventListener('hashchange', route);
route();