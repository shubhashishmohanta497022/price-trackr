import axiosClient from './axiosClient'
import { Product, ProductCreate } from '../types/product'

// Define the shape of a single price history record
interface PriceHistoryEntry {
  price: number;
  date: string; // This could also be a Date object if you parse it
}

export const productApi = {
  getProducts: async (): Promise<Product[]> => {
    const response = await axiosClient.get('/api/products')
    return response.data
  },

  getProduct: async (id: number): Promise<Product> => {
    const response = await axiosClient.get(`/api/products/${id}`)
    return response.data
  },

  createProduct: async (product: ProductCreate): Promise<Product> => {
    const response = await axiosClient.post('/api/products', product)
    return response.data
  },

  updateProduct: async (id: number, product: Partial<ProductCreate>): Promise<Product> => {
    const response = await axiosClient.put(`/api/products/${id}`, product)
    return response.data
  },

  deleteProduct: async (id: number): Promise<void> => {
    await axiosClient.delete(`/api/products/${id}`)
  },

  // Add the explicit return type here
  getProductPriceHistory: async (id: number): Promise<PriceHistoryEntry[]> => {
    const response = await axiosClient.get(`/api/products/${id}/price-history`)
    return response.data
  },
}