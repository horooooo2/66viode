<template>
  <view class="video-container">
    <!-- 引入播放器 -->
    <yb-video
      ref="videoRef" 
      :title="videoTitle" 
      height="480rpx"
      :src="videoSrc"
      :poster="poster"
      :autoplay="autoplay"
      :loop="loop"
      :muted="muted"
      controls
      @play="onPlay"
      @pause="onPause"
      @ended="onEnded"
      @error="onError"
      @loadedmetadata="handleLoaded"
      @fullscreenchange="onFullscreenChange"
    ></yb-video>
  </view>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch, nextTick } from 'vue'
import { onHide, onUnload, onBackPress } from '@dcloudio/uni-app'

const props = defineProps({
  src: {
    type: String,
    required: true
  },
  autoplay: {
    type: Boolean,
    default: false
  },
  loop: {
    type: Boolean,
    default: false
  },
  muted: {
    type: Boolean,
    default: false
  },
  showControls: {
    type: Boolean,
    default: true
  },
  poster: {
    type: String,
    default: ''
  }
})

const videoSrc = ref('')
const videoRef = ref(null)
const videoTitle = ref('')
const isIOS = ref(false)
const isPlaying = ref(false)

// 检测是否为 iOS 平台
const checkPlatform = () => {
  const systemInfo = uni.getSystemInfoSync()
  isIOS.value = systemInfo.platform === 'ios'
}

// 强制暂停视频（iOS 特殊处理）
const forcePauseVideo = async () => {
  if (!videoRef.value) return
  
  try {
    // 先暂停视频
    await videoRef.value.pause?.()
    isPlaying.value = false
    
    // iOS 需要额外处理：重置播放位置
    if (isIOS.value) {
      // 延迟一下确保暂停生效
      setTimeout(async () => {
        try {
          // 尝试跳转到开始位置
          await videoRef.value?.seek?.(0)
          
          // 如果有 stop 方法，调用它
          if (videoRef.value?.stop) {
            await videoRef.value.stop()
          }
        } catch (err) {
          console.log('重置播放位置失败:', err)
        }
      }, 100)
    }
  } catch (error) {
    console.log('暂停视频失败:', error)
  }
}

// 事件处理
const onPlay = () => {
  console.log('视频开始播放')
  isPlaying.value = true
  
  // 通知其他页面暂停视频（如果需要多页面管理）
  uni.$emit('videoPlaying', 'currentVideoPage')
}

const onPause = () => {
  console.log('视频暂停')
  isPlaying.value = false
}

const onEnded = () => {
  console.log('视频播放结束')
  isPlaying.value = false
}

const onError = (e) => {
  console.error('视频播放错误:', e)
  isPlaying.value = false
}

const onFullscreenChange = (e) => {
  console.log('全屏状态变化:', e.detail?.fullScreen)
  // 退出全屏时也暂停视频
  if (!e.detail?.fullScreen && isPlaying.value) {
    forcePauseVideo()
  }
}

const handleLoaded = (e) => {
  console.log('视频元数据加载完成')
}

// 外部控制方法
const play = async () => {
  if (videoRef.value?.play) {
    await videoRef.value.play()
    isPlaying.value = true
  }
}

const pause = async () => {
  await forcePauseVideo()
}

const toggleFullscreen = () => {
  videoRef.value?.requestFullScreen?.()
}

// 页面生命周期
onHide(() => {
  console.log('页面隐藏，暂停视频')
  forcePauseVideo()
})

onUnload(() => {
  console.log('页面卸载，强制暂停视频')
  forcePauseVideo()
  cleanup()
})

// 处理返回按钮
onBackPress(() => {
  console.log('返回按钮按下，暂停视频')
  forcePauseVideo()
  return false // 不阻止默认行为
})

// 应用生命周期（处理切到后台）
const setupAppLifecycle = () => {
  // App 切换到后台
  uni.onAppHide(() => {
    console.log('App 切换到后台')
    forcePauseVideo()
  })
  
  // App 回到前台
  uni.onAppShow(() => {
    console.log('App 回到前台')
    // 可以在这里重新控制视频状态
  })
}

// 清理监听器
const cleanup = () => {
  uni.offAppHide?.()
  uni.offAppShow?.()
}

// 监听视频源变化
watch(() => props.src, (newSrc) => {
  if (newSrc && newSrc !== videoSrc.value) {
    // 切换视频源前先暂停当前视频
    forcePauseVideo()
    videoSrc.value = newSrc
  }
})

// 组件生命周期
onMounted(() => {
  videoSrc.value = props.src
  videoTitle.value = '视频播放'
  checkPlatform()
  setupAppLifecycle()
  
  // 监听全局视频播放事件（用于多页面管理）
  uni.$on('videoPlaying', (pageId) => {
    if (pageId !== 'currentVideoPage' && isPlaying.value) {
      console.log('其他页面开始播放，暂停本页面视频')
      forcePauseVideo()
    }
  })
})

onBeforeUnmount(() => {
  console.log('组件销毁前清理')
  forcePauseVideo()
  cleanup()
  uni.$off('videoPlaying')
})

// 暴露给父组件的方法
defineExpose({
  play,
  pause,
  toggleFullscreen,
  forcePauseVideo
})
</script>

<style scoped>
.video-container {
  width: 100%;
  background-color: #000;
}
</style>

<style scoped>
.video-container {
  width: 100%;
  position: relative;
  background-color: #000;
}

.video-player {
  width: 100%;
  height: auto;
  aspect-ratio: 16/9;
  display: block;
}

</style>