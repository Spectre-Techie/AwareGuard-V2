// src/utils/auth.js
export const auth = {
  getToken() { return localStorage.getItem("AG_TOKEN"); },
  setToken(t) { localStorage.setItem("AG_TOKEN", t); },
  clear() { localStorage.removeItem("AG_TOKEN"); localStorage.removeItem("AG_USER"); },
  setUser(u) { localStorage.setItem("AG_USER", JSON.stringify(u)); },
  getUser() { try { return JSON.parse(localStorage.getItem("AG_USER")); } catch { return null; } }
};
