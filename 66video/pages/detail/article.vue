<template>
	<view class="my_detail">
		<NavBar title="吃瓜"></NavBar>
		<view class="eat-container">
			<view class="d_title">{{ detailData.data.title }}</view>
			<view class="d_time"><text>吃瓜视频 </text>发布于<text>{{ detailData.data.created_at }} {{store?.user?.userData?.name}}</text></view>
			<view class="d_cont" v-for="(item, index) in detailData.data.content" :key="index">
				<rich-text v-if="item.type === 'richtext'" :nodes="item.content"></rich-text>
				
				<view class="video-box" v-if="item.type === 'video'">
					<videoDom :detailData="{ data: { content: item.content.url, mobile_image: detailData.data.mobile_image } }" />
					<view class="video-label">
						<view class="video-label-item">
							<view class="text" v-for="val in detailData.data.hash_tags" :key="val">#{{ val }}</view>
						</view>
					</view>
				</view>
			</view>

			<Like :detailData="detailData" @getDetail="getData" />
			<Share :detailData="detailData"/>
			<Sponsor />
			<Critique :detailData="detailData" />
		</view>
	</view>
</template>

<script setup>
	import {
		reactive,
		ref,
		defineEmits,
		defineProps,
		watchEffect,
		onMounted,
	} from 'vue'
	import {
		useRoute
	} from 'vue-router'
	import { onLoad } from '@dcloudio/uni-app'
	import NavBar from '@/components/NavBar/index.vue'
	import videoDom from '../video/index.vue'
	import Like from './components/like.vue'
	import Share from './components/share.vue'
	import Sponsor from './components/sponsor.vue'
	import Critique from './components/critique.vue'
	import {
		apiGetArticleDetail,
	} from '@/common/api/content.js'

	const route = useRoute()
	const detailData = reactive({
		id: '',
		type: '', // video, image, novel
		data: null
	})

	onLoad((options)=>{
		console.log('onload options=',options);
		if(options.id){
			detailData.id = options.id;
			detailData.type = options.type || 'article';
			getData();
		}
	})


	
	const getData = () => {
		apiGetArticleDetail({
			id: route.query.id
		}).then(res => {
			if (res.code === 0) {
				detailData.data = res.data
			} else {
				uni.showToast({
					title: res.msg,
					icon: 'none',
					duration: 2000
				});
				if( res.code == -1 ){
					setTimeout(()=>{
						uni.navigateBack();
					},2500);
				}
			}
		})
	}

</script>
<style lang="scss" scoped>
	.my_detail {
		width: 100%;
		height: 100vh;
		background: #111;
		display: flex;
		flex-direction: column;
		* img{
			width: 100%;
		}
		.eat-container {
			width: 100%;
			min-height: 0;
			flex: 1;
			padding: 20rpx;
			overflow-y: auto;
			
			.video-box {
				width: 100%;
				.video-title {
					margin-top: 15rpx;
					font-size: 28rpx;
					line-height: 40rpx;
					color: #ddd;
				}
				.video-label {
					margin-top: 20rpx;
					display: flex;
					align-items: center;
					&-info {
						position: relative;
						top: 1rpx;
						font-size: 24rpx;
						color: #999;
						font-weight: 400;
						
					}
					&-item {
						display: flex;
						align-items: center;
						color: #DB7FDB;
						font-size: 24rpx;
						font-weight: 400;
						margin-left: 10rpx;
						gap: 8px;
						// .text {
						// 	margin-right: 8rpx;
						// }
					}
				}
			}
		}

		.d_title {
			color: #fff;
			font-size: 28rpx;
			text-align: center;
		}

		.d_time {
			margin-top: 18rpx;
			color: #aaa;
			font-size: 23rpx;
		}

		.d_cont {
			padding: 20rpx 0;
			color: #fff;
			font-size: 24rpx;
		}
	}
</style>