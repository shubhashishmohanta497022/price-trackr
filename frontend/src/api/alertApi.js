import axiosClient from './axiosClient';
export const alertApi = {
    getAlerts: async () => {
        const response = await axiosClient.get('/api/alerts');
        return response.data;
    },
    createAlert: async (alertData) => {
        const response = await axiosClient.post('/api/alerts', alertData);
        return response.data;
    },
    deleteAlert: async (id) => {
        await axiosClient.delete(`/api/alerts/${id}`);
    },
};
//# sourceMappingURL=alertApi.js.map