<template>
  <view v-if="showPopup && currentAd" class="popup-overlay">
    <view class="popup-container">
      <!-- 关闭按钮 -->
      <view class="close-btn" @click="closeCurrentAd">×</view>
      
      <!-- 广告图片 -->
      <image 
        class="ad-image" 
        :src="getAdImage" 
        mode="aspectFit"
        @click="handleAdClick"
      />
    </view>
  </view>
</template>

<script>
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
		  console.log(newVal)
        if (newVal && newVal.length > 0) {
          // 检查是否已经关闭过
          const isClosed = uni.getStorageSync('ad_popup_closed')
          if (!isClosed) {
            this.showPopup = true
            this.currentAdIndex = 0
          }
        }
      },
      immediate: true
    }
  },
  methods: {
    // 关闭当前广告
    closeCurrentAd() {
      // 如果还有下一个广告
      if (this.currentAdIndex < this.adData.length - 1) {
        this.currentAdIndex++
      } else {
        // 最后一个广告，关闭弹窗
        this.showPopup = false
        // 重置索引
        this.currentAdIndex = 0
        // 存储关闭状态到本地，避免重复显示
        // uni.setStorageSync('ad_popup_closed', true)
      }
    },
    // 点击广告图片
    handleAdClick() {
      if (this.currentAd && this.currentAd.url) {
        // 跳转到广告链接
        // #ifdef H5
        window.open(this.currentAd.url, '_blank')
        // #endif
        
        // #ifndef H5
        uni.navigateTo({
          url: `/pages/webview/webview?url=${encodeURIComponent(this.currentAd.url)}`
        })
        // #endif
        
        // 点击后关闭当前广告
        this.closeCurrentAd()
      }
    }
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
  position: absolute;
  top: 0;
  right: -40rpx;
  width: 60rpx;
  height: 60rpx;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 36rpx;
  font-weight: bold;
  cursor: pointer;
  z-index: 10000;
}

.close-btn:hover {
  background: rgba(0, 0, 0, 0.7);
}

</style>