import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    userData: uni.getStorageSync('storage_user_data') || null,
  }),
  getters: {
    isLogin: (state) => !!state.userData.token
  },
  actions: {
    setUser(data) {
      this.userData = data
      uni.setStorageSync('storage_user_data', data)
    },
    logout() {
      this.userData = null
      uni.removeStorageSync('storage_user_data')
    }
  }
})
