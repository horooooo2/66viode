import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    userData: uni.getStorageSync('storage_user_data') || null,
    token: uni.getStorageSync('token') || null
  }),
  getters: {
    isLogin: (state) => !!state.token
  },
  actions: {
    setUser(data) {
      this.userData = data
      this.token = data?.token || null
      uni.setStorageSync('storage_user_data', data)
      uni.setStorageSync('token', data?.token || '')
    },
    logout() {
      this.userData = null
      this.token = null
      uni.removeStorageSync('storage_user_data')
      uni.removeStorageSync('token')
    }
  }
})
