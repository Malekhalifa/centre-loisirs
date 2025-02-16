import { defineStore } from 'pinia';


export const useAuthStore = defineStore('auth', {
    state: () => ({
        isAuthenticated: false,
        role: null,
    }),
    actions: {
        login(role) {
            this.isAuthenticated = true;
            this.role = role;
        },
        logout() {
            this.isAuthenticated = false;
            this.role = null;
        },
        setRole(role) {
            this.role = role;
        },
    },
    getters: {
        isUserAuthenticated: (state) => state.isAuthenticated,
        getRole: (state) => state.role,
        isAdmin: (state) => state.role === 'admin',
    },
});