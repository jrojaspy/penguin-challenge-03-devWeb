export const formatDate = (iso) =>
  new Date(iso).toLocaleString('es', { dateStyle: 'medium', timeStyle: 'short' });

export const hostname = (url) => {
  try { return new URL(url).hostname; } catch { return url; }
};