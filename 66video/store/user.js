import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    userData: (() => {
      const stored = uni.getStorageSync('storage_user_data');
      console.log('userData', stored)
      try {
        return stored ? stored : null;
      } catch (e) {
        console.error('解析用户数据失败:', e);
        return null;
      }
    })()
  }),
  
  getters: {
    isLogin: (state) => !!state?.userData?.token,
    // 可以添加更多getter
    userToken: (state) => state?.userData?.token || '',
    userName: (state) => state?.userData?.name || '',
  },
  
  actions: {
    setUser(data) {
      // 保持响应性的赋值方式
      this.userData = Object.assign({}, data);
      
      try {
        // 序列化后存储
        uni.setStorageSync('storage_user_data', JSON.stringify(this.userData));
      } catch (e) {
        console.error('存储用户数据失败:', e);
      }
    },
    
    logout() {
      this.userData = null;
      try {
        uni.removeStorageSync('storage_user_data');
      } catch (e) {
        console.error('移除存储失败:', e);
      }
    },
  }
})