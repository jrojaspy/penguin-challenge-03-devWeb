const BASE = import.meta.env.VITE_API_URL ?? '/api';

function getVoterId() {
  let id = localStorage.getItem('voterId');
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem('voterId', id);
  }
  return id;
}

export class ApiError extends Error {
  constructor(message, status, code) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
  }
}

async function request(path, options = {}) {
  let res;
  try {
    res = await fetch(`${BASE}${path}`, {
      ...options,
      headers: { 'Content-Type': 'application/json', 'X-Voter-Id': getVoterId(), ...options.headers },
    });
  } catch {
    throw new ApiError('No se pudo conectar con el servidor', 0, 'NETWORK_ERROR');
  }
  const data = await res.json().catch(() => null);
  if (!res.ok) throw new ApiError(data?.error?.message ?? `Error ${res.status}`, res.status, data?.error?.code);
  return data;
}

export const api = {
  getLinks: ({ tag, q } = {}) => {
    const qs = new URLSearchParams(Object.entries({ tag, q }).filter(([, v]) => v));
    return request(`/links?${qs}`);
  },
  getLink: (id) => request(`/links/${id}`),
  createLink: (body) => request('/links', { method: 'POST', body: JSON.stringify(body) }),
  getTags: () => request('/tags'),
  addComment: (id, body) => request(`/links/${id}/comments`, { method: 'POST', body: JSON.stringify(body) }),
  vote: (id, value) => request(`/links/${id}/votes`, { method: 'POST', body: JSON.stringify({ value }) }),
};