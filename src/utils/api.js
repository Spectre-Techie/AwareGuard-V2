const BASE_URL = "https://awareguard-backend.onrender.com";

// ===== REFRESH TOKEN MUTEX =====
// Prevents multiple simultaneous refresh calls when several API calls 401 at once
let isRefreshing = false;
let refreshQueue = []; // queue of { resolve, reject } waiting for refresh

function processQueue(error, token) {
  refreshQueue.forEach(({ resolve, reject }) => {
    if (error) reject(error);
    else resolve(token);
  });
  refreshQueue = [];
}

// Attempt to refresh the access token via httpOnly cookie
async function refreshAccessToken() {
  const res = await fetch(`${BASE_URL}/api/auth/refresh`, {
    method: 'POST',
    credentials: 'include', // sends AG_REFRESH httpOnly cookie
    headers: { 'Content-Type': 'application/json' },
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || 'Token refresh failed');
  }

  const data = await res.json();
  // Store the new access token
  localStorage.setItem('AG_TOKEN', data.token);
  // Update user data if returned (includes role)
  if (data.user) {
    localStorage.setItem('AG_USER', JSON.stringify(data.user));
  }
  return data.token;
}

export const apiFetch = async (endpoint, options = {}) => {
  const token = localStorage.getItem("AG_TOKEN");

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    credentials: 'include', // always send cookies for cross-origin
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  });

  // If 401, attempt silent refresh and retry once
  if (res.status === 401) {
    // If already refreshing, queue this request
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        refreshQueue.push({
          resolve: (newToken) => {
            // Retry original request with new token
            resolve(
              fetch(`${BASE_URL}${endpoint}`, {
                ...options,
                credentials: 'include',
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${newToken}`,
                  ...options.headers,
                },
              }).then(async (retryRes) => {
                let data;
                try { data = await retryRes.json(); } catch { throw new Error("Server returned invalid response"); }
                if (!retryRes.ok) throw new Error(data.error || "Request failed");
                return data;
              })
            );
          },
          reject,
        });
      });
    }

    isRefreshing = true;
    try {
      const newToken = await refreshAccessToken();
      processQueue(null, newToken);

      // Retry the original request with new token
      const retryRes = await fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${newToken}`,
          ...options.headers,
        },
      });

      let data;
      try { data = await retryRes.json(); } catch { throw new Error("Server returned invalid response"); }
      if (!retryRes.ok) throw new Error(data.error || "Request failed");
      return data;
    } catch (refreshError) {
      processQueue(refreshError, null);
      // Refresh failed — clear auth state and redirect to signin
      localStorage.removeItem('AG_TOKEN');
      localStorage.removeItem('AG_USER');
      window.location.href = '/signin';
      throw refreshError;
    } finally {
      isRefreshing = false;
    }
  }

  let data;
  try {
    data = await res.json();
  } catch {
    throw new Error("Server returned invalid response");
  }

  if (!res.ok) {
    throw new Error(data.error || "Request failed");
  }

  return data;
};

// Server-side logout: revoke refresh cookie + clear localStorage
export const apiLogout = async () => {
  try {
    await fetch(`${BASE_URL}/api/auth/logout`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    });
  } catch {
    // Logout should succeed even if server call fails
  }
  localStorage.removeItem('AG_TOKEN');
  localStorage.removeItem('AG_USER');
};
