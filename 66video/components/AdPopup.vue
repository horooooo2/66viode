<template>
  <view v-if="showPopup && currentAd" class="popup-overlay">
    <view class="popup-container">
      <!-- 广告图片 -->
      <image 
        class="ad-image" 
        :src="getAdImage" 
        mode="aspectFit"
        @click="handleAdClick"
      />
      <!-- 关闭按钮 -->
      <view class="close-btn" @click="closeCurrentAd">×</view>
    </view>
  </view>
</template>

<script>
// 广告状态管理常量
const AD_STORAGE_KEY = 'ad_popup_closed'

export default {
  props: {
    adData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      currentAdIndex: 0,
      showPopup: false
    }
  },
  computed: {
    // 当前广告
    currentAd() {
      return this.adData[this.currentAdIndex]
    },
    // 根据设备获取图片
    getAdImage() {
      if (!this.currentAd) return ''
      return this.currentAd.pc_image
    }
  },
  watch: {
    // 监听广告数据变化
    adData: {
      handler(newVal) {
        console.log('广告数据更新:', newVal)
        if (newVal && newVal.length > 0) {
          this.checkAdStatus()
        }
      },
      immediate: true
    }
  },
  methods: {
    // 检查广告显示状态
    checkAdStatus() {
      const isClosed = this.getAdClosedStatus()
      if (isClosed) {
        this.showPopup = false
      } else {
        this.showPopup = true
        this.currentAdIndex = 0
      }
    },
    
    // 获取广告关闭状态
    getAdClosedStatus() {
      try {
        // 使用 sessionStorage 替代 localStorage
        // #ifdef H5
        const adCloseData = sessionStorage.getItem(AD_STORAGE_KEY)
        // #endif
        
        // #ifndef H5
        // 在非H5环境下，uni没有sessionStorage，使用localStorage但添加页面关闭监听
        const adCloseData = uni.getStorageSync(AD_STORAGE_KEY)
        // #endif
        
        if (!adCloseData) return false
        
        const data = JSON.parse(adCloseData)
        return data.closed === true
      } catch (error) {
        console.error('解析广告状态失败:', error)
        this.clearAdStatus()
        return false
      }
    },
    
    // 清除广告状态
    clearAdStatus() {
      // #ifdef H5
      sessionStorage.removeItem(AD_STORAGE_KEY)
      // #endif
      
      // #ifndef H5
      uni.removeStorageSync(AD_STORAGE_KEY)
      // #endif
    },
    
    // 关闭当前广告
    closeCurrentAd() {
      // 如果还有下一个广告
      if (this.currentAdIndex < this.adData.length - 1) {
        this.currentAdIndex++
      } else {
        this.closeAdPopup()
      }
    },
    
    // 关闭广告弹窗
    closeAdPopup() {
      this.showPopup = false
      this.currentAdIndex = 0
      this.setAdClosedStatus()
    },
    
    // 设置广告关闭状态
    setAdClosedStatus() {
      const closeData = {
        closed: true
      }
      
      // #ifdef H5
      sessionStorage.setItem(AD_STORAGE_KEY, JSON.stringify(closeData))
      // #endif
      
      // #ifndef H5
      uni.setStorageSync(AD_STORAGE_KEY, JSON.stringify(closeData))
      
      // 在非H5环境下监听页面卸载事件
      if (typeof window !== 'undefined') {
        window.addEventListener('beforeunload', this.clearAdStatus)
      }
      // #endif
    },
    
    // 点击广告图片
    handleAdClick() {
      if (this.currentAd && this.currentAd.url) {
        this.navigateToAd()
        this.closeAdPopup()
      }
    },
    
    // 跳转到广告链接
    navigateToAd() {
      // #ifdef H5
      window.open(this.currentAd.url, '_blank')
      // #endif
      
      // #ifndef H5
      uni.navigateTo({
        url: `/pages/webview/webview?url=${encodeURIComponent(this.currentAd.url)}`
      })
      // #endif
    }
  },
  
  // 在非H5环境下，组件销毁时清除状态
  beforeUnmount() {
    // #ifndef H5
    if (typeof window !== 'undefined') {
      window.removeEventListener('beforeunload', this.clearAdStatus)
    }
    // #endif
  }
}
</script>


<style scoped>
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.popup-container {
  position: relative;
  max-width: 80%;
  max-height: 80%;
  background: transparent;
}

.ad-image {
  width: 600rpx;
  border-radius: 10rpx;
  cursor: pointer;
}

.close-btn {
  width: 60rpx;
  height: 60rpx;
  background: rgba(255, 255, 255, 0.5);
  color: white;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 36rpx;
  font-weight: bold;
  cursor: pointer;
  z-index: 10000;
  margin: 0 auto;
}

.close-btn:hover {
  background: rgba(0, 0, 0, 0.7);
}

</style>