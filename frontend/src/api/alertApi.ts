import axiosClient from './axiosClient'

// Define the shape of the data for creating an alert
interface CreateAlertPayload {
  productId: string;
  targetPrice: number;
  // You can add any other properties that an alert might need here
}

export const alertApi = {
  getAlerts: async () => {
    const response = await axiosClient.get('/api/alerts')
    return response.data
  },

  // Use the new interface instead of 'any'
  createAlert: async (alertData: CreateAlertPayload) => {
    const response = await axiosClient.post('/api/alerts', alertData)
    return response.data
  },

  deleteAlert: async (id: number) => {
    await axiosClient.delete(`/api/alerts/${id}`)
  },
}