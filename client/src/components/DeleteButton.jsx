import { useState } from 'react';
import { api } from '../api/client.js';

export default function DeleteButton({ linkId, title, onDeleted }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);

  async function handleClick() {
    if (!window.confirm(`¿Eliminar «${title}»? Se borrarán también sus comentarios y votos.`)) return;
    setBusy(true);
    setError(null);
    try {
      await api.deleteLink(linkId);
      onDeleted();
    } catch (err) {
      setError(err.message);
      setBusy(false);
    }
  }

  return (
    <>
      <button type="button" className="danger" disabled={busy}
        aria-label={`Eliminar ${title}`} onClick={handleClick}>
        {busy ? 'Eliminando…' : '🗑 Eliminar'}
      </button>
      {error && <span className="error" role="alert"> {error}</span>}
    </>
  );
}