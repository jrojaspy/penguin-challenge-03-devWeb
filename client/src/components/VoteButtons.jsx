import { useState } from 'react';
import { api } from '../api/client.js';

export default function VoteButtons({ linkId, score, myVote, onChange }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);

  async function cast(value) {
    if (busy) return;
    const next = myVote === value ? 0 : value; // clic repetido = quitar voto
    setBusy(true);
    setError(null);
    try {
      onChange(await api.vote(linkId, next));
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="vote" title={error ?? undefined}>
      <button type="button" className={myVote === 1 ? 'active' : ''} aria-pressed={myVote === 1}
        aria-label="Voto positivo" disabled={busy} onClick={() => cast(1)}>▲</button>
      <strong>{score}</strong>
      <button type="button" className={myVote === -1 ? 'active' : ''} aria-pressed={myVote === -1}
        aria-label="Voto negativo" disabled={busy} onClick={() => cast(-1)}>▼</button>
    </div>
  );
}