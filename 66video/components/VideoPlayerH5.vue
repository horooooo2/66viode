

<template>
  <view class="video-container">
  <div>
    <h1 class="title">{{ playlist.videos[playMediaIndex].title }}</h1>
  </div>
  <video-player :class="['player_box', { loading: !state }]" :fluid="true" :sources="config.sources"
    :poster="config.poster" crossorigin="anonymous" playsinline :playbackRates="[1, 1.5, 2]" :playbackRate="1"
    :height="210" :loop="false" :volume="0.6" controls @mounted="handleMounted">
  </video-player>


  <p class="tips">标题文字信息</p>
  <div class="setTime">
    <span v-for="item in setTimeList" :key="item.time" @click="setTime(item.val)">{{ item.time }}</span>
  </div>
  <button class="btn">保存到桌面 观看更多视频</button>

  <h3 class="recommend_tips">精彩推荐</h3>
  <div class="recommend">
    <div class="recommend_item" @click="changePlayer(i)" v-for="(item, i) in playlist.videos" :key="item.id">
      <img :src="item.image" alt="" srcset="">
      <p>{{ item.title }}</p>
    </div>
    <div class="recommend_item" style="visibility: hidden;" v-if="playlist.videos.length % 2 !== 0"></div>
  </div>
  </view>
</template>

<script setup >
import { ref, reactive, computed, nextTick } from "vue";
import { playlist } from "./videos";
// #ifdef H5
import { VideoPlayer } from '@videojs-player/vue'	// #endif
import 'video.js/dist/video-js.css'
// import { VideoPlayerProps, VideoPlayerState } from "@videojs-player/vue";
// import videojs from "video.js";
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

<style  scoped>
.player_box {
  margin-top: 10px;
  width: 100%;
}

.title {
  background: #262626;
  color: #eee;
  padding: 6px 20px;
  border-radius: 4px;
  margin: 5px;
}

.tips {
  text-align: left;
  margin-top: 5px;
  color: #eee;
  font-size: 13px;
}

.setTime {
  margin: 5px 0px;
  display: flex;

 
}
.setTime    span {
    width: 62px;
    height: 31px;
    line-height: 31px;
    text-align: center;
    font-size: 12px;
    color: #333;
    border-radius: 25px;
    background: #00D2BE;
    margin-right: 2px;
    cursor: pointer;
  }

.btn {
  display: block;
  width: 80%;
  height: 35px;
  line-height: 35px;
  text-align: center;
  color: #333;
  border-radius: 25px;
  background: #00D2BE;
  margin: 22px auto;
}

.recommend {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

.recommend_tips {
  font-size: 13px;
  margin: 5px;
  text-align: left;
  color: #fff;
}

.recommend_item {
  width: 49%;
  border-radius: 4px;
  overflow: hidden;
  background: #666;
  color: #ddd;
  margin-bottom: 5px;
  cursor: pointer;


}

.recommend_item  img {
    display: block;
    width: 100%;
    height: 60px;
  }
  .recommend_item  p {
    padding: 3px;
    margin: 0;
    text-align: left;
  }
</style>
