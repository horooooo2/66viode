<template>
  <view class="video-container">
    <!-- Uniapp的video组件 -->
    <video 
      id="uniVideo"
      class="video-player"
      :src="videoSrc"
      :controls="true"
      :autoplay="autoplay"
      :loop="loop"
      :muted="muted"
      :show-center-play-btn="true"
      :enable-progress-gesture="true"
      :play-btn-position="'center'"
      :poster="poster"
      @play="onPlay"
      @pause="onPause"
      @ended="onEnded"
      @error="onVideoError"
      @timeupdate="onTimeUpdate"
      @fullscreenchange="onFullscreenChange"
    ></video>
    
    <!-- 自定义控制条 -->
    <view class="controls" v-if="showControls">
      <button @click="togglePlay">{{ isPlaying ? '暂停' : '播放' }}</button>
      <button @click="toggleMute">{{ muted ? '取消静音' : '静音' }}</button>
      <text class="time">{{ currentTimeText }} / {{ durationText }}</text>
      <button @click="toggleFullscreen">{{ isFullscreen ? '退出全屏' : '全屏' }}</button>
    </view>
    
    <!-- 错误提示 -->
    <view v-if="errorMessage" class="error-message">
      <text>{{ errorMessage }}</text>
      <button @click="retryPlay">重试</button>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'

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
const isPlaying = ref(false)
const currentTime = ref(0)
const duration = ref(0)
const currentTimeText = ref('00:00')
const durationText = ref('00:00')
const errorMessage = ref('')
const isFullscreen = ref(false)
const videoContext = ref(null)

// 初始化播放器
const initPlayer = () => {
  errorMessage.value = ''
  videoSrc.value = props.src
  videoContext.value = uni.createVideoContext('uniVideo')
  
  if (props.autoplay) {
    setTimeout(() => {
      videoContext.value.play()
    }, 300)
  }
}

// 播放/暂停切换
const togglePlay = () => {
  if (!videoContext.value) return
  
  if (isPlaying.value) {
    videoContext.value.pause()
  } else {
    videoContext.value.play()
  }
}

// 静音/取消静音
const toggleMute = () => {
  if (!videoContext.value) return
  videoContext.value.mute(!props.muted)
}

// 全屏切换
const toggleFullscreen = () => {
  if (!videoContext.value) return
  
  if (isFullscreen.value) {
    videoContext.value.exitFullScreen()
  } else {
    videoContext.value.requestFullScreen({
      direction: 0 // 0正常竖向，90横向
    })
  }
}

// 更新时间显示
const updateTimeDisplay = () => {
  currentTimeText.value = formatTime(currentTime.value)
  durationText.value = formatTime(duration.value)
}

// 格式化时间
const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

// 重试播放
const retryPlay = () => {
  initPlayer()
}

// 事件处理
const onPlay = () => {
  isPlaying.value = true
}

const onPause = () => {
  isPlaying.value = false
}

const onEnded = () => {
  isPlaying.value = false
  currentTime.value = 0
  updateTimeDisplay()
}

const onVideoError = (e) => {
  console.error('视频错误:', e)
  isPlaying.value = false
  errorMessage.value = '视频播放出错'
  
  // 可以根据具体错误码提供更详细的错误信息
  if (e.detail && e.detail.errMsg) {
    errorMessage.value = e.detail.errMsg
  }
}

const onTimeUpdate = (e) => {
  currentTime.value = e.detail.currentTime
  duration.value = e.detail.duration
  updateTimeDisplay()
}

const onFullscreenChange = (e) => {
  isFullscreen.value = e.detail.fullScreen
}

// 生命周期
onMounted(() => {
  initPlayer()
})

// 监听props变化
watch(() => props.src, (newVal) => {
  if (newVal) {
    initPlayer()
  }
})
</script>

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

.controls {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 10px;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
  display: flex;
  align-items: center;
  gap: 10px;
  z-index: 10;
  flex-wrap: wrap;
}

.controls button {
  padding: 5px 10px;
  background-color: rgba(0, 122, 255, 0.7);
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 14px;
}

.time {
  color: white;
  font-size: 14px;
  margin-left: auto;
  margin-right: 10px;
}

.error-message {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.7);
  padding: 15px;
  border-radius: 5px;
  color: white;
  text-align: center;
  z-index: 20;
}

.error-message text {
  display: block;
  margin-bottom: 10px;
}

.error-message button {
  padding: 5px 10px;
  background-color: #007aff;
  color: white;
  border: none;
  border-radius: 4px;
}
</style>