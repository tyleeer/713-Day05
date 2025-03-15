import axios from 'axios'

const backendUrl = import.meta.env.VITE_BACKEND_URL || import.meta.env.VITE_API_URL;
const apiClient = axios.create({
    baseURL: backendUrl,
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
})

export default apiClient;