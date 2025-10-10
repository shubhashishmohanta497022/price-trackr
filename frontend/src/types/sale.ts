export interface Sale {
  id: number
  product_id: number
  product_name: string
  platform: string
  current_price: number
  original_price: number
  discount_percentage: number
  savings: number
  image_url?: string
  product_url: string
  detected_at: string
  is_genuine_sale: boolean
  confidence_score: number
}

export interface SaleEvent {
  id: number;
  title: string;
  store: string;
  discount_summary: string;
  status: 'ongoing' | 'upcoming' | 'top_deal';
  category: string;
  details: string;
}

export interface TrendingSale extends Sale {
  popularity_score: number
  view_count: number
  alert_count: number
}

export interface SaleFilter {
  platform?: string
  min_discount?: number
  max_price?: number
  category?: string
}

