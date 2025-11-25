<template>
	<view>
		<yb-video 
			ref="videoRef" 
			:title="videoTitle" 
			height="auto"
			:src="src"
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
import { ref } from 'vue';
import { onReady } from '@dcloudio/uni-app'

const videoRef = ref(null)
const src = ref('')
const poster = ref('')
const videoTitle = ref('视频播放')
const autoplay = ref(false)
const loop = ref(false)
const muted = ref(false)

// 初始化视频源
const initVideo = () => {
	// 设置视频源
	const videoSources = [
		'/static/video/test-360.mp4',
		'https://ydtnt-jw.oss-cn-zhangjiakou.aliyuncs.com/jw-video/%E8%A7%86%E9%A2%91/%E8%8B%B1%E8%AF%AD/%E5%94%90%E8%BF%9F%E8%AF%8D%E6%B1%87%E7%9A%84%E9%80%BB%E8%BE%91%E5%8D%95%E8%AF%8D%E8%AF%BE/Unit1-1_batch.mp4'
	]
	
	src.value = videoSources[0]
}

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

// 页面准备就绪
onReady(() => {
	initVideo()
})

// 暴露方法给父组件
defineExpose({
	play,
	pause,
	toggleFullscreen
})
</script>
