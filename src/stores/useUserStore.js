import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
    state: () => ({ token_access: "le token de test" }),
    getters: {
        getToken: (state) => state.token_access,
    },
    actions: {
        setToken(token_access) {
            this.token_access = token_access
        },
    },
})