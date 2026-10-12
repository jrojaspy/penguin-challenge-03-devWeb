import { api } from './api.js';

export function voteWidget(link) {
  const my = link.my_vote ?? 0;
  return `
    <div class="vote" data-id="${link.id}" data-my="${my}">
      <button type="button" data-value="1" class="${my === 1 ? 'active' : ''}" aria-label="Voto positivo">▲</button>
      <strong class="score">${link.score}</strong>
      <button type="button" data-value="-1" class="${my === -1 ? 'active' : ''}" aria-label="Voto negativo">▼</button>
    </div>`;
}

// Recibe un contenedor que se recrea en cada render (evita listeners duplicados)
export function bindVotes(container) {
  container.addEventListener('click', async (e) => {
    const btn = e.target.closest('.vote button');
    if (!btn) return;
    const box = btn.closest('.vote');
    const value = Number(btn.dataset.value);
    const next = Number(box.dataset.my) === value ? 0 : value;
    try {
      const result = await api.vote(box.dataset.id, next);
      box.dataset.my = result.my_vote;
      box.querySelector('.score').textContent = result.score;
      box.querySelectorAll('button').forEach((b) =>
        b.classList.toggle('active', Number(b.dataset.value) === result.my_vote),
      );
    } catch (err) {
      alert(err.message);
    }
  });
}