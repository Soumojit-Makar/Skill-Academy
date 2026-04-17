import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import api from '../api/axios'

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      login: async (email, password) => {
        const res = await api.post('/auth/login', { email, password })
        localStorage.setItem('token', res.token)
        set({ user: res.user, token: res.token })
        return res
      },
      logout: () => {
        localStorage.removeItem('token')
        set({ user: null, token: null })
      },
    }),
    { name: 'academy-auth', partialize: s => ({ user: s.user, token: s.token }) }
  )
)
