import apiClient from "./AxiosService"

export default {
    getParticipants(pageNo: number, pageSize: number) {
        return apiClient.get('/participants?pageNo=' + pageNo + '&pageSize=' + pageSize)
    },

    getParticipant(id: number) {
        return apiClient.get(`/participants/${id}`)
    }
}
