import axios from 'axios'

const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
const apiClient = axios.create({
    baseURL: backendUrl,
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
})

export default apiClient;