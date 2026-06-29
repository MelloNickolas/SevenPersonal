export interface Plan {
  id: number
  name: string
  description: string
  price: number
  timesPerWeek: number
  isPromotion: boolean
  promotionalPrice: number | null
  order: number
}

export interface PlanInput {
  name: string
  description: string
  price: number
  timesPerWeek: number
  isPromotion: boolean
  promotionalPrice: number | null
  order: number
}

export interface CarouselImage {
  id: number
  imageUrl: string
  order: number
}

export const MediaType = {
  Photo: 0,
  Video: 1,
} as const
export type MediaTypeValue = (typeof MediaType)[keyof typeof MediaType]

export interface MediaItem {
  id: number
  type: MediaTypeValue
  url: string
  thumbnailUrl: string | null
  caption: string | null
  width: number
  height: number
  order: number
}

export interface SiteSettings {
  whatsappNumber: string
  instagramUrl: string
  address: string
  openingHours: string
  whatsappDefaultMessage: string
}

export interface AuthResult {
  token: string
  expiresAt: string
}

export interface UploadSignature {
  signature: string
  timestamp: number
  apiKey: string
  cloudName: string
  folder: string
}
