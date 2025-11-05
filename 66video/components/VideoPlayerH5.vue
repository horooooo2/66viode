<!-- 
 :options="{ 
      html5: { 
        vhs: { 
          overrideNative: true 
        },
        nativeVideoTracks: false,
        nativeAudioTracks: false
      }
    }" -->

<template>
	<view class="video-container" id="player_box">
		<video-player class="video-player  vjs-big-play-centered" :class="['player_box', { loading: !state }]"
			:fluid="true" :sources="config.sources" :poster="config.poster" crossorigin="anonymous" playsinline
			:playbackRates="[1, 1.5, 2]" :playbackRate="1" :height="210" :loop="false" :volume="0.6" controls preload="none"
			@mounted="handleMounted">
		</video-player>
	</view>
</template>

<script setup>
	import {
		ref,
		reactive,
		computed,
		nextTick,
		defineProps
	} from "vue";
	// #ifdef H5
	import {
		VideoPlayer
	} from '@videojs-player/vue'
	import videojs from "video.js";
	import 'video.js/dist/video-js.css'
	// #endif

	const player = ref();
	const state = ref();

	const props = defineProps({
		detailData: {
			type: Object,
			default: () => ({})
		}
	})
	const userInfo = uni.getStorageSync('storage_user_data')
	const config = computed(() => {
		const src = props.detailData?.data?.content;
		let type = props.detailData?.data?.type;
		console.log('Video source:', src);
		console.log('Video type:', type);

		// 如果没有明确的类型，根据URL自动判断
		if (!type && src) {
			if (src.includes('.m3u8')) {
				type = 'application/x-mpegurl'; // HLS流
			} else if (src.includes('.mp4')) {
				type = 'video/mp4';
			} else if (src.includes('.webm')) {
				type = 'video/webm';
			} else {
				type = 'application/x-mpegurl'; // 默认为HLS
			}
		}


		return {
			sources: [{
				src: src,
				type: type || 'application/x-mpegurl',
			}, ],
			poster: props.detailData?.data?.mobile_image
		};
	});

	// const props = defineProps({
	// 		src: {
	// 			type: String,
	// 			required: true
	// 		},
	// 		autoplay: {
	// 			type: Boolean,
	// 			default: false
	// 		}
	// })

	const setTime = (time) => {
		console.log("time=", time);
		nextTick(() => {
			player.value?.currentTime(time);
		});
	};
	const playMediaIndex = ref(0);

	const handleMounted = (payload) => {
		state.value = payload.state;
		player.value = payload.player;

		// 添加错误监听
		if (payload.player) {
			// payload.player.on('play', () => {
			// 	if (props.detailData?.data?.show_type == 1 && !userInfo) {
			// 		uni.showToast({
			// 			title: '请登录后再观看',
			// 			icon: 'none',
			// 			duration: 2000
			// 		});
			// 		payload.player.pause(); // 阻止播放
			// 	}
			// 	if (props.detailData?.data?.show_type == 2 && !userInfo?.vip_status?.is_vip) {
			// 		uni.showToast({
			// 			title: '请开通VIP后进行观看',
			// 			icon: 'none',
			// 			duration: 2000
			// 		});
			// 		payload.player.pause(); // 阻止播放
			// 	}
			// });
			payload.player.on('error', (error) => {
				console.error('Video player error:', error);
				console.error('Current source:', config.value.sources[0]);
			});

			payload.player.on('loadstart', () => {
				console.log('Loading started for:', config.value.sources[0].src);
			});
		}
	};

	const changePlayer = (index) => {
		playMediaIndex.value = index;
		nextTick(() => {
			player.value?.play();
		});
	};
</script>

<style lang="scss" scoped>
	#player_box {
		width: 100%;
		outline: none;

		:deep() {
			video {
				outline: none;
			}

			.vjs-big-play-button {
				color: #fff;
				border: none;
				background: transparent;
			}

			.vjs-control-bar {
				font-size: 20rpx;
				border: none;

				.vjs-button {
					color: #fff;
					outline: none;
					background: none;
					border: none;
					color: inherit;
					display: inline-block;
					font-size: inherit;
					line-height: inherit;
					text-transform: none;
					text-decoration: none;
					transition: none;
					-webkit-appearance: none;
					-moz-appearance: none;
					appearance: none;
				}
			}

			.vjs-menu li {
				outline: none;
			}
		}

	}
</style>