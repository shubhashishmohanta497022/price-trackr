export interface User {
  id: number
  email: string
  username: string
  is_active: boolean
  is_verified: boolean
  created_at: string
  updated_at?: string
}

export interface UserCreate {
  email: string
  username: string
  password: string
}

export interface UserLogin {
  username: string
  password: string
}

export interface UserProfile extends User {
  first_name?: string
  last_name?: string
  avatar_url?: string
  phone?: string
  preferences: UserPreferences
}

export interface UserPreferences {
  currency: string
  timezone: string
  email_notifications: boolean
  push_notifications: boolean
  price_alert_threshold: number
}

export interface AuthToken {
  access_token: string
  token_type: string
  expires_in: number
}
