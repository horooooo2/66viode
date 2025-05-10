<template>
	<view class="player-container">
		<!-- 视频播放器容器 -->
		<video ref="videoRef" class="video-player" controls playsinline webkit-playsinline x5-playsinline
			x5-video-player-type="h5" x5-video-player-fullscreen="true" x5-video-orientation="portrait"></video>

		<!-- 错误提示 -->
		<view v-if="error" class="error-message">
			{{ error }}
		</view>

		<!-- 加载状态 -->
		<view v-if="loading" class="loading">
			视频加载中...
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		onMounted,
		onBeforeUnmount,
		watch
	} from 'vue'
	import Hls from 'hls.js'

	const props = defineProps({
		src: {
			type: String,
			required: true
		},
		autoplay: {
			type: Boolean,
			default: false
		}
	})

	const videoRef = ref(null)
	const hls = ref(null)
	const loading = ref(false)
	const error = ref(null)

	// 初始化播放器
	const initPlayer = () => {
		if (Hls.isSupported()) {
			destroyPlayer() // 先销毁之前的实例

			hls.value = new Hls({
				enableWorker: false, // 在移动端建议关闭worker
				lowLatencyMode: true,
				backBufferLength: 90
			})

			hls.value.attachMedia(videoRef.value)
			hls.value.on(Hls.Events.MEDIA_ATTACHED, () => {
				loading.value = true
				hls.value.loadSource(props.src)
			})
			hls.value.on(Hls.Events.MANIFEST_PARSED, () => {
				loading.value = false
				if (props.autoplay) {
					videoRef.value.play().catch(e => {
						error.value = '自动播放失败: ' + e.message
					})
				}
			})
			hls.value.on(Hls.Events.ERROR, (event, data) => {
				loading.value = false
				if (data.fatal) {
					switch (data.type) {
						case Hls.ErrorTypes.NETWORK_ERROR:
							error.value = '网络错误，请重试'
							hls.value.startLoad()
							break
						case Hls.ErrorTypes.MEDIA_ERROR:
							error.value = '视频格式错误'
							hls.value.recoverMediaError()
							break
						default:
							error.value = '播放错误，请重试'
							destroyPlayer()
							initPlayer()
							break
					}
				}
			})
		} else if (videoRef.value.canPlayType('application/vnd.apple.mpegurl')) {
			// 原生支持HLS的浏览器（如Safari）
			videoRef.value.src = props.src
			if (props.autoplay) {
				videoRef.value.play().catch(e => {
					error.value = '自动播放失败: ' + e.message
				})
			}
		} else {
			error.value = '您的浏览器不支持播放m3u8视频'
		}
	}

	// 销毁播放器
	const destroyPlayer = () => {
		if (hls.value) {
			hls.value.destroy()
			hls.value = null
		}
	}

	// 监听src变化
	watch(() => props.src, (newVal) => {
		if (newVal) {
			initPlayer()
		}
	})

	onMounted(() => {
		initPlayer()
	})

	onBeforeUnmount(() => {
		destroyPlayer()
	})
</script>

<style scoped>
	.player-container {
		width: 100%;
		max-width: 800px;
		margin: 0 auto;
		position: relative;
	}

	.video-player {
		width: 100%;
		background-color: #000;
		aspect-ratio: 16/9;
		/* 保持16:9比例 */
	}

	.error-message {
		color: #f44336;
		padding: 16px;
		text-align: center;
		background-color: #ffebee;
		margin-top: 10px;
		border-radius: 4px;
	}

	.loading {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		color: white;
		background-color: rgba(0, 0, 0, 0.7);
		padding: 10px 20px;
		border-radius: 4px;
	}
</style>