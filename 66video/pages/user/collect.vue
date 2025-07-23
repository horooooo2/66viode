<template>
	<view class="collect">
		<NavBar title="收藏记录">
			<template #right>
				<view style="font-size: 28rpx;color: #ddd;" @click="toUpdate">管理</view>
			</template>
		</NavBar>
		<view class="collect-container">
			<view class="filter">
				<view class="panel">
					<view class="left">频道：吃瓜</view>
					<image class="arrow" src="/static/images/index/icon_close.png" mode="widthFix"></image>
				</view>
				<view class="panel">
					<view class="left">发布日期：今日</view>
					<image class="arrow" src="/static/images/index/icon_close.png" mode="widthFix"></image>
				</view>
			</view>
			<view class="list">
				<view class="list-item" v-for="i in 4" :key="i">
					<view v-if="isShowFooter" class="check">
						<image v-if="isChecked" src="/static/images/setting/icon_checkbox.svg" mode="widthFix"></image>
						<image v-else src="/static/images/setting/icon_checkbox_active.svg" mode="widthFix"></image>
					</view>
					<view class="cover">
						<image class="pic" src="/static/images/img.png" mode=""></image>
						<view class="type">视频</view>
					</view>
					<view class="right-panel">
						<view class="title">未来不再遥远。外面多少风雨、黑暗都不再怕</view>
						<view class="time">
							<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
								<path
									d="M8.2582 10.875H3.81537C3.11549 10.875 2.44627 10.2056 2.44627 9.59275V2.41149C2.44627 1.7986 3.11549 1.125 3.81537 1.125H8.2582C8.95809 1.125 9.56828 1.7986 9.56828 2.41149V9.59275C9.56828 10.2056 8.95809 10.875 8.2582 10.875ZM3.81537 1.77048C3.41257 1.77048 3.08337 2.05759 3.08337 2.41149V9.59275C3.08337 9.94548 3.41123 10.2338 3.81537 10.2338H8.2582C8.661 10.2338 8.9902 9.94665 8.9902 9.59275V2.41149C8.9902 2.05876 8.66234 1.77048 8.2582 1.77048H3.81537Z"
									fill="#777777" />
								<path
									d="M9.21527 8.40776H2.77766C2.64758 8.40776 2.54211 8.30229 2.54211 8.17221C2.54211 8.04213 2.63938 7.89034 2.76945 7.89034H9.20707C9.33715 7.89034 9.45082 8.04213 9.45082 8.17221C9.45082 8.30229 9.34535 8.40776 9.21527 8.40776ZM5.99208 9.81752C5.7331 9.81752 5.52217 9.60659 5.52217 9.3476C5.52217 9.08862 5.7331 8.87768 5.99208 8.87768C6.25107 8.87768 6.46201 9.08862 6.46201 9.3476C6.46201 9.60659 6.25107 9.81752 5.99208 9.81752Z"
									fill="#777777" />
							</svg>
							<text>2023/09/23</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view v-if="isShowFooter" class="footer">
			<view class="all-button">
				<image v-if="isAllChecked" src="/static/images/setting/icon_checkbox.svg" mode="widthFix"></image>
				<image v-else src="/static/images/setting/icon_checkbox_active.svg" mode="widthFix"></image>
				<text class="tui-text">全选</text>
			</view>
			<view class="button">删除</view>
		</view>
	</view>
</template>

<script>
	import NavBar from '@/components/NavBar/index.vue'
	export default {
		components: {
			NavBar
		},
		data() {
			return {
				isShowFooter: false,
				isAllChecked: true,
				isChecked: true
			}
		},
		methods: {
			toUpdate() {
				this.isShowFooter = !this.isShowFooter
			}
		}
	}
</script>

<style lang="scss" scoped>
	.collect {
		width: 100%;
		background-color: #101010;
		min-height: 100vh;
		display: flex;
		flex-direction: column;

		&-container {
			width: 100%;
			padding: 16rpx 32rpx;
			box-sizing: border-box;

			.filter {
				width: 100%;
				display: flex;
				gap: 20rpx;
				margin-bottom: 28rpx;

				.panel {
					flex: 1;
					padding: 12rpx 20rpx;
					height: 68rpx;
					box-sizing: border-box;
					border-radius: 12rpx;
					background: rgba(255, 255, 255, 0.05);
					display: flex;
					align-items: center;
					justify-content: space-between;

					.left {
						color: #bbb;
						font-size: 24rpx;
						flex: 1;
					}

					.arrow {
						flex-shrink: 0;
						width: 28rpx;
						height: 28rpx;
						margin-left: 10rpx;
					}
				}
			}

			.list {
				display: flex;
				flex-direction: column;
				gap: 32rpx;

				.list-item {
					width: 100%;
					height: 144rpx;
					display: flex;
					align-items: center;
					justify-content: space-between;
					gap: 24rpx;

					.check {
						flex-shrink: 0;
						width: 32rpx;
						height: 32rpx;

						image {
							width: 100%;
							height: 100%;
							display: block;
						}
					}

					.cover {
						flex-shrink: 0;
						position: relative;
						width: 256rpx;
						height: 100%;
						border-radius: 20rpx;
						overflow: hidden;

						.pic {
							width: 100%;
							height: 100%;
							display: block;
						}

						.type {
							position: absolute;
							top: 0;
							left: 0;
							padding: 4rpx 8rpx;
							box-sizing: border-box;
							border-radius: 20rpx 0 12rpx 0;
							background: rgba(0, 0, 0, 0.60);
							font-size: 20rpx;
							color: #DB7FDB;
						}
					}

					.right-panel {
						flex: 1;
						display: flex;
						flex-direction: column;
						gap: 24rpx;

						.title {
							color: #ddd;
							font-size: 26rpx;
							line-height: 32rpx;
							display: -webkit-box;
							/* 弹性伸缩盒子模型 */
							-webkit-line-clamp: 3;
							/* 限制最多显示2行 */
							-webkit-box-orient: vertical;
							/* 垂直排列子元素 */
							overflow: hidden;
						}

						.time {
							display: flex;
							align-items: center;
							gap: 8rpx;
							color: #666;
							font-size: 24rpx;
						}
					}
				}
			}
		}

		.footer {
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 100rpx;
			background-color: #202020;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 14rpx 32rpx;
			box-sizing: border-box;

			.all-button {
				display: flex;
				align-items: center;

				image {
					width: 32rpx;
					height: 32rpx;
					margin-right: 20rpx;
				}

				text {
					color: #ddd;
					font-size: 26rpx;
				}
			}

			.button {
				width: 168rpx;
				height: 72rpx;
				border-radius: 20rpx;
				background: #EB5050;
				line-height: 72rpx;
				color: #fff;
				font-size: 32rpx;
				text-align: center;
			}
		}
	}
</style>