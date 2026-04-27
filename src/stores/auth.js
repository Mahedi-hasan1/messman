import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLoggedIn: false,
    user: null,
    token: null,
    mess: null,
    hasMess: false
  }),
  actions: {
    login(user, token) {
      this.isLoggedIn = true
      this.user = user
      this.token = token
      this.mess = user?.mess || null
      this.hasMess = !!this.mess
    },
    logout() {
      this.isLoggedIn = false
      this.user = null
      this.token = null
      this.mess = null
      this.hasMess = false
    },
    setMess(mess) {
      this.mess = mess
      this.hasMess = !!mess
    }
  }
})