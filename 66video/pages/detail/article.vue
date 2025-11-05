<template>
	<view class="my_detail">
		<NavBar title="吃瓜"></NavBar>
		<view class="eat-container">
			<view class="d_title">{{ detailData.data.title }}</view>
			<view class="d_time"><text>吃瓜视频 </text>发布于<text>{{ detailData.data.created_at }}
					{{store?.user?.userData?.name}}</text></view>
			<view class="d_cont" v-for="(item, index) in detailData.data?.content" :key="index">
				<rich-text v-if="item.type === 'richtext'" :nodes="item?.content"></rich-text>
				<view v-if="(item?.content?.show_type == 1 && !userInfo) || (item?.content?.show_type == 2 && !userInfo?.vip_status?.is_vip)">
					<view class="play_demo" @click="playDemo()">
						<image :src="detailData.data.mobile_image"></image>
						<image class="play" src="/static/images/play_icon.png"></image>
						<view class="back"></view>
						<image class="logo" :src="logo" v-if="logo" />
					</view>
				</view>
				<view v-else>
					<view class="video-box" v-if="item.type === 'video'">
						<videoDom
							:detailData="{ data: { content: item?.content?.url, mobile_image: detailData.data.mobile_image, show_type: item?.content?.show_type } }" />
						<view class="video-label">
							<view class="video-label-item">
								<view class="text" v-for="val in detailData.data.hash_tags" :key="val" @click="toPath('/pages/search/index?content=' + val)">#{{ val }}</view>
							</view>
						</view>
					</view>
				</view>
			</view>

			<Like :detailData="detailData" @getDetail="getData" />
			<Share :detailData="detailData" />
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
		computed,
		defineProps,
		watchEffect,
		onMounted,
	} from 'vue'
	import {
		useRoute
	} from 'vue-router'
	import {
		onLoad
	} from '@dcloudio/uni-app'
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
	const isLogin = computed(() => userStore.isLogin)
	const userInfo = uni.getStorageSync('storage_user_data')
	const logo = uni.getStorageSync('logo')
	onLoad((options) => {
		if (options.id) {
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
			} else if(res.code === 401) {
				uni.showToast({
					title: res.msg,
					icon: 'none',
					duration: 2000
				});
				uni.navigateTo({
					url: '/pages/eat/index'
				})
			} else {
				uni.showToast({
					title: res.msg,
					icon: 'none',
					duration: 2000
				});
				if (res.code == -1) {
					uni.navigateTo({
						url: '/pages/eat/index'
					})
				}
			}
		})
	}
	const playDemo = () => {
		if(!userInfo.value) {
			return uni.showToast({
				title: '请登录后再进行观看',
				icon: 'none',
				duration: 2000
			});
		} else {
			return uni.showToast({
				title: '请开通vip后再进行观看',
				icon: 'none',
				duration: 2000
			});
		}
	}
	const toPath = (path) => {
		uni.navigateTo({
			url: path
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

		* img {
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
			.play_demo{
				position: relative;
				width: 100%;
				height: 560rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				image{
					position: absolute;
					z-index: 999;
					margin: 0!important;
					padding: 0;
				}
				.play{
					z-index: 99999;
					width: 120rpx;
					height: 120rpx;
				}
				.logo{
					right: 60rpx;
					top: 60rpx;
					width: 150rpx;
					height: 60rpx;
					z-index: 99999;
				}
				.back{
					background: rgba(0,0,0,0.3);
					width: 100%;
					height: 100%;
					position: absolute;
					z-index: 9999;
				}
			}
		}
	}
</style>