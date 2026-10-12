import { api } from '../api.js';
import { escapeHtml, formatDate, hostname } from '../utils.js';
import { voteWidget, bindVotes } from '../votes.js';


const app = document.getElementById('app');
const state = { links: [], tags: [], tag: '', q: '', loading: true, error: null };

export async function renderListView() {
  state.tag = '';
  state.q = '';
  app.innerHTML = `
    <section class="panel">
      <h2>Nuevo enlace</h2>
      <form id="link-form" class="form">
        <label>URL <input name="url" type="url" required placeholder="https://..." /></label>
        <label>Título <input name="title" required minlength="3" maxlength="120" /></label>
        <label>Descripción <textarea name="description" maxlength="500"></textarea></label>
        <label>Etiquetas (separadas por coma) <input name="tags" placeholder="js, css" /></label>
        <p id="form-error" class="error" hidden></p>
        <button class="primary">Guardar enlace</button>
      </form>
    </section>
    <section>
      <form id="search-form" class="filters">
        <input name="q" placeholder="Buscar por título o descripción..." />
        <button class="primary">Buscar</button>
      </form>
      <div id="tag-filter" class="tags"></div>
      <div id="links"></div>
    </section>`;

  bindEvents();
  await loadData();
}

async function loadData() {
  state.loading = true;
  state.error = null;
  paint();
  try {
    [state.links, state.tags] = await Promise.all([
      api.getLinks({ tag: state.tag, q: state.q }),
      api.getTags(),
    ]);
  } catch (err) {
    state.error = err.message;
  } finally {
    state.loading = false;
    paint();
  }
}

function paint() {
  renderTags();
  renderLinks();
}

function renderTags() {
  const box = document.getElementById('tag-filter');
  box.innerHTML =
    `<button class="tag ${state.tag === '' ? 'active' : ''}" data-tag="">Todas</button>` +
    state.tags
      .map((t) => `<button class="tag ${t.name === state.tag ? 'active' : ''}" data-tag="${escapeHtml(t.name)}">#${escapeHtml(t.name)} (${t.count})</button>`)
      .join('');
}

function linkCard(link) {
  return `
    <article class="card">
      ${voteWidget(link)}
      <div class="card-body">
        <h3><a href="#/links/${link.id}">${escapeHtml(link.title)}</a></h3>
        <a class="url" href="${escapeHtml(link.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(hostname(link.url))}</a>
        ${link.description ? `<p>${escapeHtml(link.description)}</p>` : ''}
        <div class="tags">${link.tags.map((t) => `<button class="tag" data-tag="${escapeHtml(t)}">#${escapeHtml(t)}</button>`).join('')}</div>
        <p class="meta">💬 ${link.comment_count} · ${formatDate(link.created_at)}</p>
      </div>
    </article>`;
}

function renderLinks() {
  const box = document.getElementById('links');
  if (state.loading) box.innerHTML = '<p class="loader">Cargando…</p>';
  else if (state.error) box.innerHTML = `<p class="error">${escapeHtml(state.error)}</p>`;
  else if (state.links.length === 0) box.innerHTML = '<p class="empty">No hay enlaces para mostrar 🐈</p>';
  else box.innerHTML = state.links.map(linkCard).join('');
}

function bindEvents() {
  // Delegación: un solo listener por contenedor, sobrevive a los re-renders
  document.getElementById('tag-filter').addEventListener('click', onTagClick);
  document.getElementById('links').addEventListener('click', onTagClick);

  document.getElementById('search-form').addEventListener('submit', (e) => {
    e.preventDefault();
    state.q = new FormData(e.currentTarget).get('q').trim();
    loadData();
  });

  document.getElementById('link-form').addEventListener('submit', onCreate);
  bindVotes(document.getElementById('links'));
}

function onTagClick(e) {
  const btn = e.target.closest('button[data-tag]');
  if (!btn) return;
  state.tag = btn.dataset.tag;
  loadData();
}

async function onCreate(e) {
  e.preventDefault();
  const form = e.currentTarget;
  const errorBox = document.getElementById('form-error');
  errorBox.hidden = true;
  try {
    await api.createLink(Object.fromEntries(new FormData(form)));
    form.reset();
    await loadData();
  } catch (err) {
    errorBox.textContent = err.message;
    errorBox.hidden = false;
  }
}