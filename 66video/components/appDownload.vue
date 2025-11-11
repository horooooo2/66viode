<template>
	<!-- #ifdef H5 -->
	<view class="app-download-bar" v-if="appShow && appData">
		<!-- 左侧关闭按钮 -->
		<view class="close-btn" @click="appClose()">
			<image class="close-icon" src="/static/images/app_close.png" mode="widthFix"></image>
		</view>

		<!-- 中间内容 -->
		<view class="content">
			<view class="app-icon">
				<image class="close-icon" :src="appData.icon" mode="widthFix"></image>
			</view>
			<view class="app-info">
				<view class="app-title">吃瓜APP</view>
				<view class="app-desc">免费！高清！下载安装不迷路！ </view>
			</view>
		</view>

		<!-- 右侧下载按钮 -->
		<view class="download-btn" @click="handleDownload">
			<image style="width: 180rpx;margin-top: 10rpx;margin-left: 20rpx;" src="/static/images/download_button.png" mode="widthFix"></image>
		</view>
	</view>
	<!-- #endif -->
</template>

<script>
	// 应用下载状态管理常量
	const APP_STORAGE_KEY = 'app_download_closed'

	export default {
		name: "appDownload",
		data() {
			return {
				appShow: true, // 默认显示，等检查到关闭状态后再隐藏
				appData: {}
			};
		},
		mounted() {
			// 组件挂载时检查状态
			this.checkAppShowStatus()
			this.appData = uni.getStorageSync('app_data')
			console.log(this.appData)
		},
		methods: {
			handleDownload() {
				window.open(this.appData.link_url)
			},
			// 检查是否应该显示
			checkAppShowStatus() {
				const isClosed = this.getAppClosedStatus()
				console.log('检查状态，是否已关闭:', isClosed)
				// 如果关闭过，就隐藏
				if (isClosed) {
					this.appShow = false
				}
			},

			// 获取应用下载关闭状态
			getAppClosedStatus() {
				try {
					// 只在H5环境下使用sessionStorage
					if (typeof sessionStorage !== 'undefined') {
						const appCloseData = sessionStorage.getItem(APP_STORAGE_KEY)
						console.log('从sessionStorage获取:', appCloseData)

						if (!appCloseData) {
							console.log('没有找到关闭记录，显示组件')
							return false
						}

						const data = JSON.parse(appCloseData)
						console.log('解析后的数据:', data)
						return data.closed === true
					}
					console.log('非H5环境，默认显示')
					return false
				} catch (error) {
					console.error('解析应用下载状态失败:', error)
					this.clearAppStatus()
					return false
				}
			},

			// 清除应用下载状态
			clearAppStatus() {
				if (typeof sessionStorage !== 'undefined') {
					sessionStorage.removeItem(APP_STORAGE_KEY)
					console.log('已清除应用关闭状态')
				}
			},

			// 关闭应用下载
			appClose() {
				console.log('用户点击关闭')
				this.appShow = false
				this.setAppClosedStatus()
			},

			// 设置应用下载关闭状态
			setAppClosedStatus() {
				if (typeof sessionStorage !== 'undefined') {
					const closeData = {
						closed: true
					}
					sessionStorage.setItem(APP_STORAGE_KEY, JSON.stringify(closeData))
					console.log('已设置应用关闭状态到sessionStorage')
				}
			}
		}
	}
</script>

<style>
	.appbox {
		width: 100%;
		margin-bottom: 10rpx;
		position: relative;

		uni-image {
			width: 100%;
			display: block;
		}

		.close {
			width: 100rpx;
			height: 100%;
			position: absolute;
			left: 0;
			z-index: 9999;
		}

		.download {
			width: 200rpx;
			height: 100%;
			position: absolute;
			right: 0;
		}
	}
</style>
<style lang="scss" scoped>
	.app-download-bar {
		top: 0;
		left: 0;
		right: 0;
		z-index: 9999;
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 100rpx;
		background: url('/static/images/app_back.png');
		background-size: 100% 100%;
		padding: 0 20rpx;
		box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.1);

		// 左侧关闭按钮
		.close-btn {
			width: 60rpx;
			height: 60rpx;
			display: flex;
			align-items: center;
			justify-content: center;

			.close-icon {
				width: 50rpx;
				color: #fff;
				font-weight: bold;
				line-height: 1;
			}
		}

		// 中间内容区域
		.content {
			flex: 1;
			display: flex;
			align-items: center;
			margin: 0 20rpx;

			.app-icon {
				width: 80rpx;
				height: 80rpx;
				background: rgba(255, 255, 255, 0.2);
				border-radius: 12rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				margin-right: 20rpx;

				.icon-text {
					font-size: 32rpx;
				}
			}

			.app-info {
				flex: 1;

				.app-title {
					font-size: 28rpx;
					font-weight: bold;
					line-height: 1.2;
					color: #000;
					margin-bottom: 4rpx;
				}

				.app-desc {
					font-size: 20rpx;
					color: rgba(255, 255, 255, 0.8);
					line-height: 1.2;
				}
			}
		}

		// 右侧下载按钮
		.download-btn {
			// background: url('/static/images/app_button.png');
			background-size: 100% 100%;
			border-radius: 30rpx;
			padding: 12rpx 24rpx;

			.btn-text {
				font-size: 22rpx;
				color: #fff;
				white-space: nowrap;
			}
		}
	}

	// 适配不同屏幕
	@media (max-width: 375px) {
		.app-download-bar {
			height: 70rpx;

			.content {
				.app-info {
					.app-title {
						font-size: 26rpx;
					}

					.app-desc {
						font-size: 18rpx;
					}
				}
			}

			.download-btn {
				padding: 10rpx 20rpx;

				.btn-text {
					font-size: 22rpx;
				}
			}
		}
	}
</style>