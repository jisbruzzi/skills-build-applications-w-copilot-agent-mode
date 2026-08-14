export function getApiBaseUrl() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();

  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev`;
  }

  return 'http://localhost:8000';
}

export function buildApiUrl(path) {
  const safePath = path.startsWith('/') ? path : `/${path}`;
  return `${getApiBaseUrl()}${safePath}`;
}

export function normalizeRecords(payload) {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (!payload || typeof payload !== 'object') {
    return [];
  }

  const candidate =
    payload.data ??
    payload.results ??
    payload.items ??
    payload.users ??
    payload.teams ??
    payload.activities ??
    payload.workouts ??
    payload.leaderboard ??
    [];

  return Array.isArray(candidate) ? candidate : [];
}
