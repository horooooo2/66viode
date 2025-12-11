<template>
	<view class="user">
		<view class="status_bar"></view>
		<view class="header-box">
			<view class="header">
				<view class="avatar" @click="toLink('/pages/user/avatar')">
					<image class="avatarUrl" :src="userInfo.avatar ? userInfo.avatar : '/static/images/mine/avatar.png'"
						mode=""></image>
				</view>
				<view class="userInfo" @click="toLink('/pages/user/info')">
					<view class="title-box">
						<view class="username">{{userInfo.username}}</view>
						<image class="copy" src="/static/images/mine/edit-icon.png" mode=""></image>
					</view>
					<!-- <view class="time">会员到期 2023/05/06</view> -->
				</view>
			</view>
		</view>

		<view class="grid-box">
			<view class="grid">
				<view class="grid-item" @click="toLink('/pages/user/submit')">
					<image class="image" src="/static/images/mine/wengao.png" mode=""></image>
					<text>投稿</text>
				</view>
				<view class="grid-item" @click="toLink('/pages/user/collect')">
					<image class="image" src="/static/images/mine/shoucang.png" mode=""></image>
					<text>收藏</text>
				</view>
				<view class="grid-item" @click="toLink('/pages/order/index')">
					<image class="image" src="/static/images/mine/history.png" mode=""></image>
					<text>历史</text>
				</view>
				<view class="grid-item" @click="toLink('/pages/points/index')">
					<image class="image" src="/static/images/mine/mall.png" mode=""></image>
					<text>商城</text>
				</view>
			</view>
		</view>

		<view class="vip-box" @click="toLink('/pages/club/index')">
			<view class="vip">
				<view class="vip-bg">
					<view class="vip-left">
						<view class="vip-top">
							<image class="level" src="/static/images/mine/icon-vip.png" mode=""></image>
							<text v-if="!userInfo.vip_status.is_vip">升级吃瓜VIP会员</text>
							<text v-else>吃瓜VIP会员</text>
						</view>
						<!-- <view class="vip-progress">
							<tui-progress :percent="60" radius="20rpx" :width="12"
								activeColor="linear-gradient(89deg, #E5C477 0.68%, #FAF1DC 98.8%)"
								backgroundColor="#980FB1"></tui-progress>
						</view> -->
						<view class="vip-bottom" v-if="!userInfo.vip_status.is_vip">
							<view class="bottom-left">立即开通</view>
						</view>
					</view>
					<view class="vip-button">
						<text>VIP俱乐部</text>
						<image class="more" src="/static/images/mine/icon-more.png" mode=""></image>
					</view>
				</view>
			</view>
		</view>

		<view class="content">
			<view class="card">
				<view class="card-item" @click="toLink('/pages/active/index')">
					<view class="card-left">
						<view class="task">任务中心</view>
						<view class="text">做任务领积分</view>
					</view>
					<image class="card-right" src="/static/images/mine/icon-task.png" mode="widthFix"></image>
				</view>
				<view class="card-item" @click="toLink('/pages/points/index')">
					<view class="card-left">
						<view class="card-title">
							<image class="coin" src="/static/images/mine/icon-coin1.png" mode=""></image>
							<text>{{userInfo.points}}</text>
						</view>
						<view class="text">小积分兑豪礼</view>
					</view>
					<image class="card-right" src="/static/images/mine/icon-coin.png" mode="widthFix"></image>
				</view>
			</view>

			<view class="cell">
				<view class="cell-item" @click="toLink('/pages/friends/index')">
					<image class="icon" src="/static/images/mine/icon-yqhy.png" mode=""></image>
					<text>邀请好友</text>
				</view>
				<view class="cell-item" @click="toLink('/pages/media/index')">
					<image class="icon" src="/static/images/mine/icon-gfmt.png" mode=""></image>
					<text>官方媒体</text>
				</view>
			</view>

			<view class="cell">
				<view class="cell-item" @click="toLink('/pages/setting/index')">
					<image class="icon" src="/static/images/mine/icon-sz.png" mode=""></image>
					<text>设置</text>
				</view>
				<!-- <view class="cell-item">
					<image class="icon" src="/static/images/mine/icon-yy.png" mode=""></image>
					<text>语言</text>
				</view> -->
				<view class="cell-item" @click="toService()">
					<image class="icon" src="/static/images/mine/icon-zxkf.png" mode=""></image>
					<text>在线客服</text>
				</view>
			</view>
			<view class="button" @click="logoutFun">退出登录</view>
		</view>
		<custom-tabbar :current="4"></custom-tabbar>
	</view>
</template>

<script>
	import {
		apiLogout,
		apiGetUserInfo
	} from '@/common/api/user.js'
	import {
		useUserStore
	} from '@/store/user'
	import CustomTabbar from '@/components/custom-tabbar.vue'
	export default {
		data() {
			return {
				userInfo: {
					vip_status: {
						is_vip: false
					}
				}
			}
		},
		components: {
			CustomTabbar
		},
		created() {
			this.getUserInfo();
		},
		methods: {
			goBack(url) {
				uni.navigateTo({
					url: '/pages/eat/index'
				});
			},
			toLink(url) {
				uni.navigateTo({
					url
				})
			},
			toService(url) {
				// #ifdef APP
				plus.runtime.openURL(uni.getStorageSync('serviceUrl'))
				// #endif

				// #ifdef H5
				window.open(uni.getStorageSync('serviceUrl'), '_blank')
				// #endif
			},
			async logoutFun() {
				const userStore = useUserStore()
				const {
					code,
					msg
				} = await apiLogout({
					loading: true
				})
				uni.showToast({
					title: msg,
					icon: 'none',
					duration: 2000
				})

				if (code === 0) {
					userStore.logout()

					// 跳转到登录页
					uni.navigateTo({
						url: '/pages/login/index?type=1'
					})
				}
			},
			async getUserInfo() {
				const {
					code,
					msg,
					data
				} = await apiGetUserInfo();
				this.userInfo = data
			}
		}
	}
</script>

<style lang="scss" scoped>
	.user {
		width: 100%;
		background-color: #101010;
		min-height: 100vh;
		background-image: url("/static/images/index/bg.png");
		background-position: top center;
		background-repeat: no-repeat;
		background-size: cover;
		display: flex;
		flex-direction: column;

		.header-box {
			padding: 24rpx 32rpx 0;
			box-sizing: border-box;

			.header {
				width: 100%;
				display: flex;
				align-items: center;
				gap: 16rpx;
				padding: 8rpx 0;
				box-sizing: border-box;
				margin-bottom: 28rpx;

				.avatar {
					width: 112rpx;
					height: 112rpx;
					border-radius: 50%;
					overflow: hidden;
					border: 2rpx solid #D018F5;
					box-sizing: border-box;
					flex-shrink: 0;

					.avatarUrl {
						width: 100%;
						height: 100%;
						display: block;
					}
				}

				.userInfo {
					flex: 1;
					display: flex;
					flex-direction: column;
					gap: 16rpx;

					.title-box {
						display: flex;
						align-items: center;
						gap: 8rpx;

						.username {
							font-size: 32rpx;
							color: #ddd;
							font-weight: 600;
						}

						.copy {
							width: 32rpx;
							height: 32rpx;
							margin-top: 8rpx;
						}
					}

					.time {
						color: #888;
						font-size: 24rpx;
						font-weight: 400;
					}
				}
			}
		}

		.grid-box {
			padding: 0 32rpx;
			box-sizing: border-box;

			.grid {
				width: 100%;
				display: grid;
				grid-template-columns: repeat(4, 1fr);
				gap: 28rpx;
				margin-bottom: 48rpx;

				.grid-item {
					display: flex;
					flex-direction: column;
					align-items: center;
					gap: 16rpx;

					.image {
						width: 48rpx;
						height: 48rpx;
					}

					text {
						font-size: 24rpx;
						color: #fff;
					}
				}
			}
		}

		.vip-box {
			padding: 0 32rpx;
			box-sizing: border-box;

			.vip {
				width: 100%;
				height: 140rpx;
				border-radius: 16rpx 16rpx 0px 0px;
				background: linear-gradient(0deg, #D018F5 0%, #FA3296 100%);

				.vip-bg {
					width: 100%;
					height: 100%;
					background: url("/static/images/mine/vip-bg.png") no-repeat 100% 100%;
					background-position-x: -52rpx;
					display: flex;
					align-items: center;
					justify-content: space-between;
					padding: 0 20rpx;
					box-sizing: border-box;

					.vip-left {
						flex: 1;
						display: flex;
						flex-direction: column;
						gap: 14rpx;

						.vip-top {
							width: 100%;
							height: 60rpx;
							display: flex;
							align-items: center;

							.level {
								width: 60rpx;
								height: 60rpx;
								display: block;
								margin-right: 10rpx;
							}

							text {
								color: #fff;
								font-size: 32rpx;
								font-weight: 900;
							}
						}

						.vip-bottom {
							width: 100%;
							display: flex;
							align-items: center;
							justify-content: space-between;
							font-size: 20rpx;
							color: #fff;
						}
					}

					.vip-button {
						display: flex;
						align-items: center;
						gap: 8rpx;
						flex-shrink: 0;
						padding: 12rpx;
						box-sizing: border-box;
						border-radius: 200rpx;
						background: linear-gradient(90deg, #FBEAC8 0%, #FBEAC8 100%);
						margin-left: 80rpx;

						text {
							color: #593E11;
							font-size: 24rpx;
						}

						.more {
							width: 24rpx;
							height: 24rpx;
							display: block;
							margin-top: 4rpx;
						}
					}
				}
			}
		}

		.content {
			width: 100%;
			min-height: 0;
			flex: 1;
			background-color: #202020;
			border-radius: 40rpx 40rpx 0 0;
			padding: 24rpx 32rpx;
			box-sizing: border-box;

			.card {
				width: 100%;
				display: grid;
				grid-template-columns: repeat(2, 1fr);
				gap: 22rpx;
				margin-bottom: 20rpx;

				.card-item {
					border-radius: 16rpx;
					background: #333;
					padding: 24rpx 34rpx;
					box-sizing: border-box;
					display: flex;
					align-items: center;
					justify-content: space-between;
					gap: 30rpx;

					.card-left {
						display: flex;
						flex-direction: column;
						gap: 24rpx;

						.task {
							font-size: 28rpx;
							color: #FF1A8C;
						}

						.text {
							color: #ccc;
							font-size: 24rpx;
						}

						.card-title {
							display: flex;
							align-items: center;
							gap: 6rpx;

							.coin {
								width: 28rpx;
								height: 28rpx;
							}

							text {
								font-size: 28rpx;
								color: #F0B643;
							}
						}
					}

					.card-right {
						width: 90rpx;
						flex-shrink: 0;
					}
				}
			}

			.cell {
				width: 100%;
				border-radius: 20rpx;
				background-color: #333;
				margin-bottom: 16rpx;

				.cell-item {
					width: 100%;
					height: 112rpx;
					padding: 28rpx 32rpx;
					box-sizing: border-box;
					display: flex;
					align-items: center;

					.icon {
						width: 56rpx;
						height: 56rpx;
						margin-right: 16rpx;
					}

					text {
						color: #ddd;
						font-size: 30rpx;
					}
				}
			}

			.button {
				width: 100%;
				height: 96rpx;
				border-radius: 12rpx;
				background: #333;
				display: flex;
				align-items: center;
				justify-content: center;
				color: #FF1A8C;
				font-size: 30rpx;
				margin-top: 42rpx;
			}
		}

		.leftIcon {
			// position: fixed;
			// top: 0;
			// left: 0;
			// z-index: 9;
			position: relative;
			z-index: 9;
			width: 100%;
			height: 90rpx;
			padding-left: 20rpx;
			display: flex;
			align-items: center;
			color: #fff;
		}
	}
</style>