import { useState } from 'react';
import { api } from '../api/client.js';

const EMPTY = { url: '', title: '', description: '', tags: '' };

export default function LinkForm({ onCreated }) {
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const update = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const link = await api.createLink(form);
      setForm(EMPTY);
      onCreated?.(link);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="panel">
      <h2>Nuevo enlace</h2>
      <form className="form" onSubmit={handleSubmit}>
        <label>URL
          <input name="url" type="url" required placeholder="https://..." value={form.url} onChange={update} />
        </label>
        <label>Título
          <input name="title" required minLength={3} maxLength={120} value={form.title} onChange={update} />
        </label>
        <label>Descripción
          <textarea name="description" maxLength={500} value={form.description} onChange={update} />
        </label>
        <label>Etiquetas (separadas por coma)
          <input name="tags" placeholder="js, css" value={form.tags} onChange={update} />
        </label>
        {error && <p className="error" role="alert">{error}</p>}
        <button className="primary" disabled={saving}>{saving ? 'Guardando…' : 'Guardar enlace'}</button>
      </form>
    </section>
  );
}