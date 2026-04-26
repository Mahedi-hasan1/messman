import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLoggedIn: false,
    user: null,
    hasMess: false
  }),
  actions: {
    login(user) {
      this.isLoggedIn = true
      this.user = user
      // Check if user has mess, for now assume not
      this.hasMess = false
    },
    logout() {
      this.isLoggedIn = false
      this.user = null
      this.hasMess = false
    },
    setHasMess(has) {
      this.hasMess = has
    }
  }
})