import { defineStore } from 'pinia'
import type { Organizer } from '@/types'
import apiClient from '@/services/AxiosService'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: null as string | null,
        user: null as Organizer | null,
    }),
    getters: {
        currentUserName(): string {
            return this.user?.username || ''
        }
    },
    actions: {
        async login(email: string, password: string) {
            const response = await apiClient.post('/api/v1/auth/authenticate', {
                username: email,
                password: password,
            })
            this.token = response.data.access_token
            console.log("this.token: ", this.token)
            localStorage.setItem('token', this.token as string)
            const meResponse = await apiClient.get('/api/v1/auth/me')
            this.user = meResponse.data.user
            console.log("this.user: ", this.user)
            localStorage.setItem('user', JSON.stringify(this.user))
            return response
        },
        logout() {
            console.log('logout')
            this.token = null
            this.user = null
            localStorage.removeItem('access_token')
            localStorage.removeItem('user')
        },
    },
})
