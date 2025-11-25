<template>
	<view class="my_detail">
		<view class="status_bar"></view>
		<NavBar title="吃瓜"></NavBar>
		<view class="eat-container">
			<view class="d_title">{{ detailData?.data?.title }}</view>
			<view class="d_time"><text>吃瓜视频 </text>发布于<text>{{ detailData?.data?.created_at }}
					{{store?.user?.userData?.name}}</text></view>
			<view class="video-label">
				<view class="video-label-item">
					<view class="text" v-for="val in detailData.data.hash_tags" :key="val"
						@click="toPath('/pages/search/index?content=' + val)">#{{ val }}</view>
				</view>
			</view>
			<view class="d_cont" v-for="(item, index) in detailData.data?.content" :key="index">
				<rich-text v-if="item.type === 'richtext'" :nodes="item?.content"></rich-text>
				<view
					v-if="(item?.content?.show_type == 1 && !userInfo) || (item?.content?.show_type == 2 && !userInfo?.vip_status?.is_vip)">
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
					</view>
				</view>
			</view>
			<Share :detailData="detailData" />
			<p style="color: #fff;margin-bottom: 20rpx;margin-top: 20rpx;">推荐</p>
			<uni-swiper-dot :info="info" :current="current" field="content" mode="round">
				<swiper class="swiper-box" style="height: 360rpx;">
					<swiper-item v-for="(item ,index) in currentInfo" :key="index" @click="change(item.id)">
						<view class="swiper-item" style="color: #fff;position: relative;">
							<view class="content">{{item.title}}</view>
							<image :src="item.mobile_image"></image>
						</view>
					</swiper-item>
				</swiper>
			</uni-swiper-dot>
			<!-- 登录弹窗 -->
			<uni-popup ref="popupRef" type="center" style="z-index: 99999;">
				<view class="login-dialog">
					<view class="dialog-content">
						<text class="dialog-text">请登录后再进行观看</text>
					</view>
					<view class="dialog-actions">
						<button class="btn cancel" @click="closeLoginDialog">取消</button>
						<button class="btn confirm" @click="goToLogin">登录</button>
					</view>
				</view>
			</uni-popup>
			<Like :detailData="detailData" @getDetail="getData" />
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
		onLoad
	} from '@dcloudio/uni-app'
	import {
		apiGetGuess,
	} from "@/common/api/user.js";
	import NavBar from '@/components/NavBar/index.vue'
	import videoDom from '../video/index.vue'
	import Like from './components/like.vue'
	import Share from './components/share.vue'
	import Sponsor from './components/sponsor.vue'
	import Critique from './components/critique.vue'
	import {
		apiGetArticleDetail,
	} from '@/common/api/content.js'
	const popupRef = ref(null)

	const openLoginDialog = () => {
		popupRef.value.open()
	}

	const closeLoginDialog = () => {
		popupRef.value.close()
	}
	const current = ref(0)
	const currentInfo = ref([])
	const change = (e) => {
		uni.navigateTo({
			url: `/pages/detail/article?id=${e}`
		})
	}
	const getGuess = () => {
		apiGetGuess()
			.then((res) => {
				currentInfo.value = res.data
			})
			.catch((e) => {
				console.log(e);
			});
	}
	const goToLogin = () => {
		closeLoginDialog()
		uni.navigateTo({
			url: '/pages/login/index'
		})
	}
	const detailData = reactive({
		id: '',
		type: '', // video, image, novel
		data: null
	})
	const isLogin = computed(() => userStore.isLogin)
	const userInfo = uni.getStorageSync('storage_user_data')
	const logo = uni.getStorageSync('logo')
	const queryId = ref(0)
	const getData = () => {
		apiGetArticleDetail({
			id: queryId.value
		}).then(res => {
			if (res.code === 0) {
				detailData.data = res.data
			} else if (res.code === 401) {
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
		if (!userInfo) {
			openLoginDialog()
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
	onLoad((options) => {
		if (options.id) {
			queryId.value = options.id;
			detailData.id = options.id;
			detailData.type = options.type || 'article';
			getData();
			getGuess()
		}
	})
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

		.video-label {
			margin-top: 20rpx;
			display: flex;
			align-items: center;
			justify-content: center;
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
			text-align: center;
			font-size: 23rpx;
		}

		.d_cont {
			padding: 20rpx 0;
			color: #fff;
			font-size: 24rpx;

			.play_demo {
				position: relative;
				width: 100%;
				height: 560rpx;
				display: flex;
				align-items: center;
				justify-content: center;

				image {
					position: absolute;
					z-index: 999;
					margin: 0 !important;
					padding: 0;
				}

				.play {
					z-index: 99999;
					width: 120rpx;
					height: 120rpx;
				}

				.logo {
					right: 60rpx;
					top: 60rpx;
					width: 150rpx;
					height: 60rpx;
					z-index: 99999;
				}

				.back {
					background: rgba(0, 0, 0, 0.3);
					width: 100%;
					height: 100%;
					position: absolute;
					z-index: 9999;
				}
			}
		}
	}

	.mask {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.5);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.dialog {
		width: 860rpx;
		background: #fff;
		border-radius: 16rpx;
		overflow: hidden;
	}

	.login-dialog {
		background: #333;
		border-radius: 20rpx;
	}

	.dialog-content {
		width: 560rpx;
		padding: 60rpx 40rpx;
		text-align: center;
	}

	.dialog-content text {
		font-size: 32rpx;
		color: rgba(255, 255, 255, 0.65);
	}

	.dialog-actions {
		display: flex;
		border-top: 1rpx solid #333;
	}

	.btn {
		flex: 1;
		height: 100rpx;
		line-height: 100rpx;
		font-size: 32rpx;
		border: none;
		background: transparent;
	}

	.btn::after {
		border: none;
	}

	.cancel {
		color: #666;
		border-right: 1rpx solid #333;
	}

	.confirm {
		color: #FF1A8C;
	}

	.swiper-box {
		.content {
			position: absolute;
			width: 100%;
			height: 100%;
			z-index: 9999;
			padding: 0 50rpx;
			white-space: pre-line;
			display: flex;
			align-items: center;
			justify-content: center;
			background: rgba(0, 0, 0, .5);
		}

		image {
			width: 100%;
			height: 360rpx;
			border-radius: 20rpx;
		}
	}
</style>