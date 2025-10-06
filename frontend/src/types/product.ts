export interface Product {
  id: number
  name: string
  url: string
  platform: string
  current_price?: number
  original_price?: number
  image_url?: string
  description?: string
  availability: string
  is_active: boolean
  created_at: string
  updated_at?: string
  user_id: number
}

export interface ProductCreate {
  name: string
  url: string
  platform: string
  description?: string
}

export interface PriceLog {
  id: number
  product_id: number
  price: number
  discount_percentage?: number
  availability: string
  timestamp: string
}

export interface ProductWithHistory extends Product {
  price_logs: PriceLog[]
}

export type Platform = 'amazon' | 'flipkart' | 'myntra' | 'croma' | 'ajio'

export interface PlatformInfo {
  name: string
  domain: string
  color: string
  logo?: string
}
