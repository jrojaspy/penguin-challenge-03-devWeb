import { api } from '../api.js';
import { escapeHtml, formatDate, hostname } from '../utils.js';
import { voteWidget, bindVotes } from '../votes.js';

const app = document.getElementById('app');

export async function renderDetailView(id) {
  app.innerHTML = '<p class="loader">Cargando…</p>';
  try {
    draw(await api.getLink(id));
  } catch (err) {
    app.innerHTML = `<p class="error">${escapeHtml(err.message)}</p><a href="#/">← Volver a la lista</a>`;
  }
}

function draw(link) {
  app.innerHTML = `
    <a href="#/">← Volver</a>
    <article class="card detail" style="margin-top:1rem">
      ${voteWidget(link)}
      <div class="card-body">
        <h2>${escapeHtml(link.title)}</h2>
        <a class="url" href="${escapeHtml(link.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(hostname(link.url))} ↗</a>
        ${link.description ? `<p>${escapeHtml(link.description)}</p>` : ''}
        <div class="tags">${link.tags.map((t) => `<span class="tag">#${escapeHtml(t)}</span>`).join('')}</div>
        <p class="meta">${formatDate(link.created_at)}</p>
      </div>
    </article>

    <section class="panel">
      <h3>Comentarios (${link.comments.length})</h3>
      <div id="comments">
        ${link.comments.length === 0
          ? '<p class="empty">Sé la primera persona en comentar</p>'
          : link.comments.map((c) => `
            <div class="comment">
              <strong>${escapeHtml(c.author)}</strong><span class="meta">${formatDate(c.created_at)}</span>
              <p>${escapeHtml(c.body)}</p>
            </div>`).join('')}
      </div>
      <form id="comment-form" class="form">
        <label>Tu nombre <input name="author" required minlength="2" maxlength="40" /></label>
        <label>Comentario <textarea name="body" required maxlength="500"></textarea></label>
        <p id="comment-error" class="error" hidden></p>
        <button class="primary">Comentar</button>
      </form>
    </section>`;

  bindVotes(app.querySelector('.detail'));

  app.querySelector('#comment-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const errorBox = app.querySelector('#comment-error');
    errorBox.hidden = true;
    try {
      await api.addComment(link.id, Object.fromEntries(new FormData(e.currentTarget)));
      await renderDetailView(link.id); // re-render completo: ¡anota este dolor!
    } catch (err) {
      errorBox.textContent = err.message;
      errorBox.hidden = false;
    }
  });
}