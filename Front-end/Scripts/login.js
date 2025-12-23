const API_BASE_URL = "https://plusintel.up.railway.app";

// ============================
// STORAGE KEYS
// ============================
const TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";
const USER_KEY = "user_data";

// ============================
// TOKEN HELPERS
// ============================
function saveAuthData({ token, refreshToken, user }) {
  if (token) localStorage.setItem(TOKEN_KEY, token);
  if (refreshToken) localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  if (user) localStorage.setItem(USER_KEY, JSON.stringify(user));
}

function clearAuthData() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

function getAccessToken() {
  return localStorage.getItem(TOKEN_KEY);
}

function getRefreshToken() {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
}

function isAuthenticated() {
  return !!getAccessToken();
}

// ============================
// LOGIN
// ============================
async function login(email, password, rememberMe = false) {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, rememberMe })
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Erro no login");
  }

  // Caso 2FA esteja habilitado
  if (data.user_id && !data.token) {
    return {
      twoFactorRequired: true,
      userId: data.user_id
    };
  }

  saveAuthData({
    token: data.token,
    refreshToken: data.refreshToken || null
  });

  return { success: true };
}

// ============================
// VERIFICAÇÃO 2FA (EMAIL)
// ============================
async function verifyTwoFactor(email, code) {
  const response = await fetch(`${API_BASE_URL}/auth/verify-login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, code })
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Código inválido");
  }

  saveAuthData({ token: data.token });
  return { success: true };
}

// ============================
// REFRESH TOKEN
// ============================
async function refreshAccessToken() {
  const refreshToken = getRefreshToken();
  if (!refreshToken) return null;

  const response = await fetch(`${API_BASE_URL}/auth/refresh-token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken })
  });

  const data = await response.json();

  if (!response.ok) {
    clearAuthData();
    return null;
  }

  localStorage.setItem(TOKEN_KEY, data.token);
  return data.token;
}

// ============================
// CADASTRO
// ============================
async function register(name, email, password, user_type = "student") {
  const response = await fetch(`${API_BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password, user_type })
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || data.message || "Erro no cadastro");
  }

  return data;
}

// ============================
// PERFIL (EXEMPLO)
// ============================
async function getProfile() {
  const token = getAccessToken();
  if (!token) throw new Error("Não autenticado");

  const response = await fetch(`${API_BASE_URL}/profile`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (response.status === 401) {
    const newToken = await refreshAccessToken();
    if (!newToken) throw new Error("Sessão expirada");
    return getProfile();
  }

  return response.json();
}

// ============================
// LOGOUT
// ============================
function logout() {
  clearAuthData();
  window.location.href = "/Front-end/Pages/Login.html";
}

// ============================
// AUTO LOGIN (CHAMAR NO LOAD)
// ============================
async function autoLogin() {
  if (!isAuthenticated()) return false;

  try {
    await getProfile();
    return true;
  } catch {
    clearAuthData();
    return false;
  }
}
