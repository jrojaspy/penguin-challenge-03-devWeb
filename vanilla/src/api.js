const API_URL = 'http://localhost:3000/api';

export function getVoterId() {
  let id = localStorage.getItem('voterId');
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem('voterId', id);
  }
  return id;
}

async function request(path, options = {}) {
  let res;
  try {
    res = await fetch(API_URL + path, {
      ...options,
      headers: { 'Content-Type': 'application/json', 'X-Voter-Id': getVoterId(), ...options.headers },
    });
  } catch {
    throw new Error('No se pudo conectar con el servidor');
  }
  const data = await res.json().catch(() => null);
  if (!res.ok) throw new Error(data?.error?.message ?? `Error ${res.status}`);
  return data;
}

export const api = {
  getLinks: (params = {}) => {
    const qs = new URLSearchParams(Object.entries(params).filter(([, v]) => v));
    return request(`/links?${qs}`);
  },
  getLink: (id) => request(`/links/${id}`),
  createLink: (body) => request('/links', { method: 'POST', body: JSON.stringify(body) }),
  getTags: () => request('/tags'),
  addComment: (id, body) => request(`/links/${id}/comments`, { method: 'POST', body: JSON.stringify(body) }),
  vote: (id, value) => request(`/links/${id}/votes`, { method: 'POST', body: JSON.stringify({ value }) }),
};