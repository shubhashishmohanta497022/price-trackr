import axiosClient from './axiosClient'
import { Product, ProductCreate } from '../types/product'

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

  getProductPriceHistory: async (id: number) => {
    const response = await axiosClient.get(`/api/products/${id}/price-history`)
    return response.data
  },
}
