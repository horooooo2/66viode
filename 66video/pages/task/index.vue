<template>
	<view class="task">
		<NavBar title="任务记录"></NavBar>
		<view class="container">
			<view class="list">
				<view class="list-item">
					<view class="item-panel">
						<view class="panel-left">
							<image class="icon-cover" src="/static/images/activity/1.png" mode=""></image>
							<view class="left-content">
								<view class="title">邀请好友</view>
								<view>任务描述</view>
							</view>
						</view>
						<view class="button">已领取</view>
					</view>
					<view class="item-box">
						<view class="order-num">订单号：092093903123</view>
						<view class="statics">
							<view class="box-num">
								<image src="/static/images/activity/jifen.png" mode=""></image>
								<text>10</text>
							</view>
							<view class="box-num">
								<image src="/static/images/activity/image133.png" mode=""></image>
								<text>10</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import NavBar from '@/components/NavBar/index.vue'
	export default {
		components: {
			NavBar,
		},
	}
</script>

<style lang="scss" scoped>
	.task {
		width: 100%;
		background-color: #101010;
		min-height: 100vh;
		display: flex;
		flex-direction: column;

		.container {
			width: 100%;
			min-height: 0;
			flex: 1;
			padding: 46rpx 32rpx;
			box-sizing: border-box;

			.list {
				width: 100%;
				display: flex;
				flex-direction: column;
				gap: 24rpx;

				.list-item {
					width: 100%;
					padding: 24rpx 30rpx;
					box-sizing: border-box;
					border-radius: 20rpx;
					background: #333;

					.item-panel {
						display: flex;
						align-items: center;
						justify-content: space-between;
						gap: 48rpx;
						margin-bottom: 32rpx;

						.panel-left {
							min-width: 0;
							flex: 1;
							display: flex;
							align-items: center;
							gap: 22rpx;

							.icon-cover {
								width: 68rpx;
								height: 68rpx;
							}

							.left-content {
								min-width: 0;
								flex: 1;
								display: flex;
								flex-direction: column;
								gap: 16rpx;
								color: #ddd;
								font-size: 22rpx;
								font-weight: 400;
								line-height: 24rpx;

								.title {
									font-size: 28rpx;
									line-height: 32rpx;
								}
							}
						}

						.button {
							width: 144rpx;
							height: 56rpx;
							background-color: #888;
							border-radius: 80rpx;
							display: flex;
							align-items: center;
							justify-content: center;
							color: #fff;
							font-size: 24rpx;
						}
					}

					.item-box {
						display: flex;
						align-items: center;
						justify-content: space-between;

						.order-num {
							color: #fff;
							font-size: 20rpx;
							font-weight: 400;
							line-height: 24rpx;
						}

						.statics {
							display: flex;
							align-items: center;
							gap: 16rpx;
							flex-shrink: 0;

							.box-num {
								display: flex;
								align-items: center;
								gap: 8rpx;

								image {
									width: 24rpx;
									height: 24rpx;
								}

								text {
									color: #ddd;
									font-size: 20rpx;
									font-weight: 700;
								}
							}
						}
					}
				}
			}
		}
	}
</style>