<template>
  <view class="video-container">
    <!-- 引入播放器 -->
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

// 事件处理
const onPlay = () => {
	console.log('视频开始播放')
}

const onPause = () => {
	console.log('视频暂停')
}

const onEnded = () => {
	console.log('视频播放结束')
}

const onError = (e) => {
	console.error('视频播放错误:', e)
}

const onFullscreenChange = (e) => {
	console.log('全屏状态变化:', e.detail.fullScreen)
}

const handleLoaded = (e) => {
	console.log('视频元数据加载完成')
}

// 外部控制方法
const play = () => {
	videoRef.value?.play()
}

const pause = () => {
	videoRef.value?.pause()
}

const toggleFullscreen = () => {
	videoRef.value?.requestFullScreen()
}
// 生命周期
onMounted(() => {
  videoSrc.value = props.src
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

</style>