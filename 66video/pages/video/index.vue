<template>
	<view class="container">
		<!-- #ifdef H5 -->
		<VideoPlayerH5 :detailData="detailData" />
		<!-- #endif -->
		<!-- #ifndef H5 -->
		<VideoPlayerApp :src="detailData?.data?.content" :autoplay="autoplay" :detailData="detailData" />
		<!-- #endif -->
	</view>
</template>

<script setup>
	import {
		ref,
		defineProps,
	} from 'vue'
	import VideoPlayerApp from '@/components/VideoPlayerApp.vue'
	import VideoPlayerH5 from '@/components/VideoPlayerH5.vue'
	// import HelloWorld from '@/components/HelloWorld.vue'
	// 测试用的m3u8地址
	const videoUrl = ref('https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8');

	const props = defineProps({
		detailData: {
			type: Object,
			default: () => ({})
		},
		autoplay: {
			type: Boolean,
			default: false
		}
	})

</script>