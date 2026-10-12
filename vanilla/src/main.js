import { renderListView } from './views/list.js';
import { renderDetailView } from './views/detail.js';

function route() {
  const hash = location.hash.replace(/^#/, '') || '/';
  const match = hash.match(/^\/links\/(\d+)$/);
  if (match) renderDetailView(Number(match[1]));
  else renderListView();
}

window.addEventListener('hashchange', route);
route();