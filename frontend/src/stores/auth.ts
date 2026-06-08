import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: {
      username: 'admin',
      role: 'ADMIN'
    }
  }),

  actions: {
    setRole(role: string) {
      this.user.role = role
    }
  }
})

export default useAuthStore