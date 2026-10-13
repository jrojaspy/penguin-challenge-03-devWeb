import { useState } from 'react';
import { api } from '../api/client.js';

export default function CommentForm({ linkId, onAdded }) {
  const [author, setAuthor] = useState(() => localStorage.getItem('author') ?? '');
  const [body, setBody] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const comment = await api.addComment(linkId, { author, body });
      localStorage.setItem('author', author);
      setBody('');
      onAdded(comment);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label>Tu nombre
        <input value={author} onChange={(e) => setAuthor(e.target.value)} required minLength={2} maxLength={40} />
      </label>
      <label>Comentario
        <textarea value={body} onChange={(e) => setBody(e.target.value)} required maxLength={500} />
      </label>
      {error && <p className="error" role="alert">{error}</p>}
      <button className="primary" disabled={saving}>{saving ? 'Enviando…' : 'Comentar'}</button>
    </form>
  );
}