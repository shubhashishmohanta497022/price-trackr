import axiosClient from './axiosClient'

export const saleApi = {
  getSales: async () => {
    const response = await axiosClient.get('/api/sales')
    return response.data
  },

  getTrendingSales: async () => {
    const response = await axiosClient.get('/api/sales/trending')
    return response.data
  },
}
