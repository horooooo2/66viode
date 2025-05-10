<template>
	<view class="container">
		<!-- #ifdef H5 -->
		<VideoPlayerH5 :src="videoUrl" :autoplay="false" />
		<!-- #endif -->
		 <!-- #ifndef H5 -->
		<VideoPlayerApp :src="videoUrl" :autoplay="false" />
		<!-- #endif -->
	</view>
</template>

<script setup>
	import { ref } from 'vue'
	import VideoPlayerApp from '@/components/VideoPlayerApp.vue'
	import VideoPlayerH5 from '@/components/VideoPlayerH5.vue'
	// 测试用的m3u8地址
	const videoUrl = ref('https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8')
</script>