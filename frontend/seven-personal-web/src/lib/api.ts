import axios from 'axios'

const baseURL = import.meta.env.VITE_API_URL ?? 'http://localhost:5110'

export const api = axios.create({
  baseURL: `${baseURL.replace(/\/$/, '')}/api`,
})

const TOKEN_KEY = 'seven_admin_token'

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY)
}

export function setToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token)
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY)
}

// Anexa o JWT do admin (quando houver) em toda requisição.
api.interceptors.request.use((config) => {
  const token = getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Em 401, limpa o token e manda pro login.
api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401 && getToken()) {
      clearToken()
      if (!window.location.pathname.startsWith('/admin/login')) {
        window.location.href = '/admin/login'
      }
    }
    return Promise.reject(error)
  },
)
