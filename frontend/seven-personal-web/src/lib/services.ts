import { api } from './api'
import type {
  AuthResult,
  CarouselImage,
  MediaItem,
  Plan,
  PlanInput,
  SiteSettings,
  UploadSignature,
} from './types'

// ===== Planos =====
export const plansApi = {
  getAll: () => api.get<Plan[]>('/plans').then((r) => r.data),
  create: (data: PlanInput) => api.post<Plan>('/plans', data).then((r) => r.data),
  update: (id: number, data: PlanInput) => api.put<Plan>(`/plans/${id}`, data).then((r) => r.data),
  remove: (id: number) => api.delete(`/plans/${id}`),
}

// ===== Carrossel (Programação do Mês) =====
export const carouselApi = {
  getAll: () => api.get<CarouselImage[]>('/carousel').then((r) => r.data),
  create: (data: { imageUrl: string; cloudinaryPublicId: string; order: number }) =>
    api.post<CarouselImage>('/carousel', data).then((r) => r.data),
  remove: (id: number) => api.delete(`/carousel/${id}`),
}

// ===== Galeria Seven =====
export const mediaApi = {
  getAll: () => api.get<MediaItem[]>('/media').then((r) => r.data),
  create: (data: {
    type: number
    url: string
    cloudinaryPublicId: string
    thumbnailUrl: string | null
    caption: string | null
    width: number
    height: number
    order: number
  }) => api.post<MediaItem>('/media', data).then((r) => r.data),
  remove: (id: number) => api.delete(`/media/${id}`),
}

// ===== Configurações =====
export const settingsApi = {
  get: () => api.get<SiteSettings>('/settings').then((r) => r.data),
  update: (data: SiteSettings) => api.put<SiteSettings>('/settings', data).then((r) => r.data),
}

// ===== Auth =====
export const authApi = {
  login: (username: string, password: string) =>
    api.post<AuthResult>('/auth/login', { username, password }).then((r) => r.data),
}

// ===== Upload (assinatura) =====
export const uploadApi = {
  getSignature: () => api.get<UploadSignature>('/upload/signature').then((r) => r.data),
}
