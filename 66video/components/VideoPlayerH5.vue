

<template>
  <view class="video-container" id="player_box">
  <video-player class="video-player  vjs-big-play-centered" :class="['player_box', { loading: !state }]" :fluid="true" :sources="config.sources"
    :poster="config.poster" crossorigin="anonymous" playsinline :playbackRates="[1, 1.5, 2]" :playbackRate="1"
    :height="210" :loop="false" :volume="0.6" controls @mounted="handleMounted">
  </video-player>
  </view>
</template>

<script setup >
import { ref, reactive, computed, nextTick } from "vue";
import { playlist } from "./videos";
// #ifdef H5
import { VideoPlayer } from '@videojs-player/vue'
import videojs from "video.js";
import 'video.js/dist/video-js.css'
// #endif

const player = ref();
const state = ref();

const setTimeList = reactive([
  {
    time: '00:10',
    val: 10,
  },
  {
    time: '00:20',
    val: 20,
  },
  {
    time: '00:50',
    val: 50,
  },
  {
    time: '01:10',
    val: 70,
  },
])

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

const setTime = (time) => {
  console.log("time=", time);
  nextTick(() => {
    player.value?.currentTime(time);
  });
};

const playMediaIndex = ref(0);
const config = computed(() => ({
  sources: [
    {
      src: playlist.videos[playMediaIndex.value].video,
      type: playlist.videos[playMediaIndex.value].type || "",
    },
  ],
  poster: playlist.videos[playMediaIndex.value].image,
}));

const handleMounted = (payload) => {
  console.log("player==", payload);
  state.value = payload.state;
  player.value = payload.player;
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
	 video{
	 	outline: none;
	 }
	.vjs-big-play-button{
		color: #fff;
		border: none;
		background: transparent;
	 }
	 .vjs-control-bar{
		 font-size: 20rpx;
		 border: none;
		 .vjs-button{
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
	 .vjs-menu li{
		 outline: none;
	 }
 }

}

</style>
